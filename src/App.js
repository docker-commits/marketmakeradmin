import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Home from './Movable/pages/Home';
import AddEdit from './Movable/pages/AddEdit';
import NavBar from './Movable/components/NavBar';
import {Login} from './Movable/pages/Login';
import { AuthContextProvider, useAuthState } from './firebase';

const AuthenticatedRoute = () => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  )
}

const UnauthenticatedRoute = () => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    !isAuthenticated ? <Outlet/> : <Navigate to="/"/>
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App bgg">
          <NavBar />
          <Routes>
            {/* <AuthenticatedRoute exact path="/" element={<Home/>} />
            <AuthenticatedRoute exact path="/add" element={<AddEdit/>} />
            <AuthenticatedRoute exact path="/update/:id" element={<AddEdit/>} /> */}
            <Route element={<AuthenticatedRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route  path="/add" element={<AddEdit />} />
              <Route  path="/update/:id" element={<AddEdit />} />
            </Route>
            <Route element={<UnauthenticatedRoute/>}>
            <Route exact path="/login" element={<Login />} />
            </Route>
            
          </Routes>

        </div>
      </Router>
    </AuthContextProvider>

  );
}

export default App;
