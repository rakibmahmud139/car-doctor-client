import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }



    // login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //Sign with google
    const signINWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logout user 
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }



    // on auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);

            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                // send jwt token in server site
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt response', data);

                        // WARNING: Local storage is not the best (second best place) to store access token
                        localStorage.setItem('car-access-token', data.token);

                    })
            }
            else {
                localStorage.removeItem('car-access-token')
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [])



    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logout,
        signINWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;