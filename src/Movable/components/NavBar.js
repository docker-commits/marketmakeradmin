import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import "../../App.css"
import { db, useAuthState } from '../../firebase';
import { QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';

//import "../assests/bootstrap.min.css"
const initialState = {
  link:""
}
const NavBar = () => {
    const navigate=useNavigate()
    const { isAuthenticated } = useAuthState()
    const[data,setData] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);

    const {link} = data
    const linkChange = (e) =>{
      e.persist();
      setData({...data,[e.target.name]:e.target.value})
    }
    const getLink = async()=>{
      console.log(3)
      const linksRef = collection(db, 'links');
      const querySnapshot = await getDocs(linksRef);
        if (!querySnapshot.empty) {
          const firstDocument = querySnapshot.docs[0];
    const linkData = firstDocument.data();
    console.log(linkData)
    setData((prevState) => ({ ...prevState, link: linkData.link }));
      }
    }
    useEffect(() => {
      console.log(1)
       getLink()
       console.log(2)
  }, [])
    let { id } = 1
    const linkSubmit= async(e) =>{
      e.preventDefault();
  console.log("fef");

  try {
    const linksRef = collection(db, "links");
    const querySnapshot = await getDocs(linksRef);

    if (querySnapshot.empty) {
      // No documents found, add a new document
      await addDoc(linksRef, {
        link: data.link,
        timestamp: serverTimestamp(),
      });
    } else {
      // Document found, update the existing document
      const firstDocument = querySnapshot.docs[0];
      const linkDocRef = doc(db, "links", firstDocument.id);
      await updateDoc(linkDocRef, {
        link: data.link,
        timestamp: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
  }
  //   else {
  //     try {
  //         await updateDoc(doc(db, "links",link,1), {
  //             ...data,
  //             timestamp: serverTimestamp()
  //         })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  //   }
    console.log(isAuthenticated)
  return (
    <Box sx={{ flexGrow: 1 }} className="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Market Makers Employement Management
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             ADMIN
          </Typography>
          { isAuthenticated && <Button onClick={()=>navigate("/add")} color="inherit" sx={{ flexGrow: 1 }}>ADD Employe</Button>}
          { isAuthenticated && <form onSubmit={linkSubmit}><input name="link" type='text' onChange={linkChange} value={link} /><Button type="submit" color="inherit" sx={{ flexGrow: 1 }}>ADD Link</Button></form>}

        </Toolbar>
      </AppBar>
    </Box>
    // <>
    // <header role="banner">
    //   <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    //     <div class="container">
    //       <a class="navbar-brand" onClick={()=>navigate("/")}>Market Maker</a>
    //       {/* <h2> ADMIN Mannagement</h2> */}
    //       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
    //         <span class="navbar-toggler-icon"></span>
    //       </button>

    //       <div class="collapse navbar-collapse" id="navbarsExample05">
            
             

    //         <ul class="navbar-nav ml-auto">
    //           <li class="nav-item cta-btn">
    //           <Button onClick={()=>navigate("/add")} variant="contained">ADD Employe</Button>
    //           </li>
    //         </ul>
            
    //       </div>
    //     </div>
    //   </nav>
    // </header>
    // </>
  )
}

export default NavBar