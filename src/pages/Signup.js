import React, { useState } from 'react';
// import { firebase, firebaseAuth, firebaseDB } from '../firebase/firebase.js';

import { auth , googleProvider} from "../firebase/firebase.js";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import PharmacistController from '../features/Pharmacist/PharmacistController.js';

const Signup = () => {
    const [error, setError] = useState(null);
    const pharmacistController = new PharmacistController();
    

    const handleGoogleSignIn = async () => {
        try {
            signInWithPopup(auth, googleProvider).then((result) => {
                const user = result.user;
                console.log(user);
                pharmacistController.getPharmacistUserById(user.email)
                    .then((pharmacist) => {
                        alert('Pharmacist user found. Save to local db: ', pharmacist);
                        pharmacistController.savePharmacistToLocalDb(pharmacist);
                    })
                    .catch((error) => {
                        if(error.message === 'Pharmacist user not found') {
                            pharmacistController.createPharmacistFromGoogleUser(user).then((pharmacist) => {
                                pharmacistController.savePharmacistToRemoteDb(pharmacist).then((id) => {
                                    console.log('Pharmacist saved to remote db. Now save to local db');
                                    pharmacistController.savePharmacistToLocalDb(pharmacist).then(() => {
                                       
                                    }).catch((error) => {
                                        console.log('Error saving pharmacist to local db: ', error);
                                    });
                                }).catch((error) => {
                                    console.log('Error creating pharmacist user: ', error);
                                });
                            }).catch((error) => {
                                console.log('Error creating pharmacist user from Google User object: ', error);
                            });
                        } else {
                            console.log('Error fetching pharmacist user: ', error);
                        }
                        
                    }
                )

            }
            ).catch((error) => {
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                setError(errorMessage);
                console.log('Google Sign Up Error: ' + errorMessage);
                alert('Google Sign Up Error: ' + errorMessage);
            });
        } catch (err){
          console.error(err);
          alert('Google Signin Error: ' + err.message);
        }
      };


      const logOut = async () => {
        try {
        await signOut(auth);
        } catch (err){
          console.error(err);
        }
      };


    // const handleGoogleSignIn = () => {
    //     const provider = googleProvider;
    //     firebaseAuth.signInWithPopup(provider)
    //         .then((result) => {
    //             // Handle successful Google signup
    //             console.log(result.user);
    //             alert('Google Sign Up Successful: ' + result.user.displayName);
    //         })
    //         .catch((error) => {
    //             // Handle error
    //             console.error(error);
    //             setError(error.message);
    //             alert('Google Sign Up Error: ' + error.message);
    //         });
    // };

    //   const handleGoogleSignIn = async () => {
    //         try {
    //             // Sign in with Google provider
    //             const provider = new firebase.auth.GoogleAuthProvider();
    //             await firebaseAuth.signInWithPopup(provider);
    //             alert('Sign in with Google successful' + user.displayName);
    //         } catch (error) {
    //             setError(error.message);
    //             alert('Sign in with Google failed');
    //         }
    //     };

    return (
        <div>
            <div>Signup</div>
            <button onClick={handleGoogleSignIn}>Google Sign Up</button>
        </div>
    );
};

export default Signup