import React, { useState } from 'react';
// import { firebase, firebaseAuth, firebaseDB } from '../firebase/firebase.js';

import { auth , googleProvider} from "../firebase/firebase.js";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import PharmacistController from '../features/Pharmacist/PharmacistController.js';

const Signup = () => {
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async () => {
        try {
            signInWithPopup(auth, googleProvider).then((result) => {
                const user = result.user;
                console.log(user);
                alert('Google Sign Up Successful: ' + user.displayName);

                PharmacistController.getPharmacistUserById(user.email)
                    .then((pharmacist) => {
                        console.log('Pharmacist user found. Save to local db: ', pharmacist);
                        PharmacistController.savePharmacistToLocalDb(pharmacist);
                    })
                    .catch((error) => {
                        if(error.message === 'Pharmacist user not found') {
                            PharmacistController.createPharmacistFromGoogleUser(user).then((pharmacist) => {
                                PharmacistController.savePharmacistToRemoteDb(pharmacist).then((id) => {
                                    console.log('Pharmacist saved to remote db. Now save to local db');
                                    PharmacistController.savePharmacistToLocalDb(pharmacist).then(() => {
                                        console.log('Pharmacist saved to local db');
                                    }).catch((error) => {
                                        console.error('Error saving pharmacist to local db: ', error);
                                    });
                                }).catch((error) => {
                                    console.error('Error creating pharmacist user: ', error);
                                });
                            }).catch((error) => {
                                console.error('Error creating pharmacist user from Google User object: ', error);
                            });
                        }
                        console.error('Error fetching pharmacist user: ', error);
                    }
                )



            }
            ).catch((error) => {
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                setError(errorMessage);
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