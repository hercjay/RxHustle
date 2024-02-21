
import { firestore, auth } from '../../firebase/firebase.js';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Pharmacist from './Pharmacist';
const passwordUtil = require('../../utils/passwordUtil.js');


class PharmacistController {

  // Method to fetch pharmacist user details by ID
  async getPharmacistUserById(userId) {
    try {
      // Retrieve the pharmacist user document from Firestore
      const docRef = doc(firestore, 'pharmacists', userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const pharmacist = new Pharmacist(data);
        return pharmacist;
      } else {
        throw new Error('Pharmacist user not found');
      }
    } catch (error) {
      console.error('Error fetching pharmacist user: ', error);
      throw error; // Throw the error for handling in the calling code
    }
  }

  //method to create a new Pharmacist user from google sign in
    async createPharmacistFromGoogleUser(userData) {
        try {
            const pharmacist = new Pharmacist(
                {
                    id: userData.email ?? userData.uid ?? '',
                    firstname: userData.displayName.split(' ')[0] ?? userData.email.split('@')[0] ?? '',
                    lastname: userData.displayName.split(' ')[2] ??  userData.displayName.split(' ')[1] ?? '',
                    email: userData.email,
                    phoneNumber: userData.phoneNumber ?? '',
                    address: '',
                    password: userData.email ?? '',
                    photo: userData.photoURL ?? '',
                    availability: [],
                    shifts: [],
                    role: 'pharmacist'
                }
            );
            // Hash the password
            await passwordUtil.hashPassword(pharmacist.password)
            .then(hashedPassword => {
                console.log('Hashed password:', hashedPassword);
                pharmacist.password = hashedPassword;
            })
            .catch(error => {
                console.error('Error hashing password for new pharmacist:', error);
            });
            return pharmacist;
        } catch (error) {
            console.error('Error creating pharmacist user from Google User object: ', error);
            throw error; // Throw the error for handling in the calling code
        }
    }


    //save pharmacist data to firestore 
    async savePharmacistToRemoteDb(pharmacist) {
        try {
            if (!pharmacist || !pharmacist.id) {
                console.error('Invalid pharmacist object:', pharmacist);
                throw new Error('Invalid pharmacist object');
            }
            const docRef = doc(firestore, 'pharmacists', pharmacist.id);
            await setDoc(docRef, { ...pharmacist });
            console.log('Pharmacist user saved to Remote db: ', pharmacist.id);
            return pharmacist;
        } catch (error) {
            console.error('Error saving Pharmacist to remote db: ', error);
            throw error; // Throw the error for handling in the calling code
        }
    }

    //save pharmacist data to local db
    async savePharmacistToLocalDb(pharmacist) {
        try {
            //clear the password field and then save other data to localStorage
            const pharmacistData = { ...pharmacist };
            delete pharmacistData.password;
            localStorage.setItem('rxhustle-pharmacist', JSON.stringify(pharmacistData));
            console.log('Pharmacist user saved to Local db: ', pharmacist.id);
            return pharmacist;
        } catch (error) {
            console.error('Error saving pharmacist user to local db: ', error);
            throw error; 
        }
    }

    //remove pharmacist data from local db
    async removePharmacistFromLocalDb() {
        try {
            localStorage.removeItem('rxhustle-pharmacist');
            console.log('Pharmacist user removed from Local db');
        } catch (error) {
            console.error('Error removing pharmacist user from local db: ', error);
            throw error; 
        }
    }

    //method to get data of logged in pharmacist from local storage
    async getLoggedInPharmacist() {
        try {
            const pharmacistData = localStorage.getItem('rxhustle-pharmacist');
            if (pharmacistData !== null) {
                const pharmacist = new Pharmacist(JSON.parse(pharmacistData));
                return pharmacist;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching pharmacist user from local db: ', error);
            throw error; // Throw the error for handling in the calling code
        }
    }


    async logOut(){
        try {
        await signOut(auth)
            .then(() => {
                this.removePharmacistFromLocalDb();
                console.log('Pharmacist signed out');
            })
        } catch (err){
          console.error(err);
        }
      };



}

// Export the PharmacistController class for use in other modules
export default PharmacistController;

