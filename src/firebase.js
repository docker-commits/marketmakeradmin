// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyDeiuYj666dtlglbcONzTr5JHqX40MSewI",
  authDomain: "employeemanagement-52ba0.firebaseapp.com",
  projectId: "employeemanagement-52ba0",
  storageBucket: "employeemanagement-52ba0.appspot.com",
  messagingSenderId: "169606969988",
  appId: "1:169606969988:web:502c41356f79bd3a4de0d1"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export const storage=getStorage(app);
//auth check

export const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}