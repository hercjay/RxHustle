import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Google as GoogleIcon } from 'react-bootstrap-icons';

import { auth , googleProvider} from "../firebase/firebase.js";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import PharmacistController from '../features/Pharmacist/PharmacistController.js';
import { LoadingContext } from '../context/LoadingContext.js';

const Signup = () => {
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(LoadingContext);
    const pharmacistController = new PharmacistController();
    const navigate = useNavigate();
    
    const handleGoogleSignIn = async () => {
        try {
            signInWithPopup(auth, googleProvider).then((result) => {
                const user = result.user;
                console.log(user);
                pharmacistController.getPharmacistUserById(user.email)
                    .then((pharmacist) => {
                        console.log('Pharmacist user found. Save to local db: ', pharmacist);
                        pharmacistController.savePharmacistToLocalDb(pharmacist);
                        setUser(pharmacist);
                        navigate('/dashboard');
                    })
                    .catch((error) => {
                        if(error.message === 'Pharmacist user not found') {
                            pharmacistController.createPharmacistFromGoogleUser(user).then((pharmacist) => {
                                pharmacistController.savePharmacistToRemoteDb(pharmacist).then((id) => {
                                    console.log('Pharmacist saved to remote db. Now save to local db');
                                    pharmacistController.savePharmacistToLocalDb(pharmacist).then(() => {
                                        setUser(pharmacist);
                                        navigate('/dashboard');
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


      return (
        <div className="flex flex-col items-center justify-center h-[25em]">
          <h2 className="text-3xl text-sky-700 font-bold mb-4">Sign Up or Login</h2>
          <p className="text-md mb-6">Sign up or login with your Google account to get started!</p>
          <button
            onClick={handleGoogleSignIn}
            className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded shadow-lg shadow-sky-300 flex gap-2 items-center'
          >
            <GoogleIcon className='text-2xl' /> Continue with Google
          </button>
        </div>
      );
};

export default Signup