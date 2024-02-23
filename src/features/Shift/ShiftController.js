import { firestore, auth } from '../../firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Shift from './Shift.js';


class ShiftController {

    //method to calculate the total earnings for a shift
    calculateTotal(shift) {
        const startTime = new Date(`1970-01-01T${this.shift.start}`);
        const endTime = new Date(`1970-01-01T${this.shift.end}`);
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        return hours * this.shift.rate;
    }

    //method to generate a unique id for a shift
    generateId() {
        return new Date().getTime().toString();
    }


    //method to create a new shift from the form data
    createShift(formData) {
        const shift = new Shift({
            //id: null,
            place: formData.place,
            date: formData.date,
            start: formData.start,
            end: formData.end,
            location: formData.location,
            rate: formData.rate,
            pharmacistId: formData.pharmacistId,
        });
        return shift;
    }
    
    // Method to add a new shift to the remote database
    async addShiftToRemoteDb(shift) {
        try {
            const docRef = doc(firestore, 'shifts', shift.id);
            await setDoc(docRef, { ...shift });
            console.log('Shift created with ID: ', docRef.id);
            return shift;
        } catch (error) {
            console.error('Error creating shift: ', error);
            throw error;
        }
    }


}


export default ShiftController;