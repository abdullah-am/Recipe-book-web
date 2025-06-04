import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signoutuser =()=>{
        setLoading(true);
         return signOut(auth);
    }

    // const updateUser=(updatedData)=>{
    //     return updateProfile(auth.currentUser,updatedData);
    // }

    const googlelogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const userInfo = {
        user,
        loading,
        createUser,
        loginUser,
        signoutuser,
        //updateUser,
        googlelogin
    }

    return (
        <AuthContext  value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;