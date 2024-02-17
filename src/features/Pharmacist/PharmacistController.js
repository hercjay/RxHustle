
import firebase from 'firebase/app';
import 'firebase/firestore';
import Pharmacist from './Pharmacist';


class PharmacistController {
  constructor() {
    // Initialize Firebase Firestore
    this.firestore = firebase.firestore();
  }


  // Method to fetch pharmacist user details by ID
  async getPharmacistUserById(userId) {
    try {
      // Retrieve the pharmacist user document from Firestore
      const docSnapshot = await this.firestore.collection('pharmacists').doc(userId).get();
      if (docSnapshot.exists) {
        const pharmacist = new Pharmacist(docSnapshot.data());
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
                    lastname: userData.displayName.split(' ')[1] ?? '',
                    email: userData.email,
                    phoneNumber: userData.phoneNumber ?? '',
                    address: '',
                    password: hashPassword(userData.email) ?? '',
                    photo: userData.photoURL ?? '',
                    availability: [],
                    shifts: [],
                }
            );
            return pharmacist;
        } catch (error) {
            console.error('Error creating pharmacist user from Google User object: ', error);
            throw error; // Throw the error for handling in the calling code
        }
    }


    //save pharmacist data to firestore 
    async savePharmacistToRemoteDb(pharmacist) {
        try {
            await this.firestore.collection('pharmacists').doc(pharmacist.id).set({ ...pharmacist });
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
            localStorage.setItem('rxhustle-user', JSON.stringify(pharmacistData));
            console.log('Pharmacist user saved to Local db: ', pharmacist.id);
            return pharmacist;
        } catch (error) {
            console.error('Error saving pharmacist user to local db: ', error);
            throw error; // Throw the error for handling in the calling code
        }
    }



}

// Export the PharmacistController class for use in other modules
export default PharmacistController;
