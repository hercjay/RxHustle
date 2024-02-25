import { firestore, auth } from '../../firebase/firebase.js';
import { doc, getDoc, getDocs, setDoc, collection, query, orderBy } from 'firebase/firestore';
import Shift from './Shift.js';


class ShiftController {

    //method to calculate the total earnings for a shift
    calculateTotal(shift) {
        const startTime = new Date(`1970-01-01T${shift.start}`);
        const endTime = new Date(`1970-01-01T${shift.end}`);
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        const total = hours * shift.rate;
        return total < 0 ? 0 : total;
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

    // Method to get all shifts from db
    async getAllShiftsFromRemoteDb() {
        try {
            const shifts = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'shifts'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                shifts.push(doc.data());
            });
            return shifts;
        } catch (error) {
            console.error('Error getting shifts: ', error);
            throw error;
        }
    }

    // Apply for a shift
    async applyForShift(shift, user) {
        try {
            if (user) {
                const docRef = doc(firestore, 'applications', `${user.id}_${shift.id}`);
                //if doc already exists, do not apply again
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return "You have already applied for this shift. You will be notified if you are selected.";
                } else {
                    await setDoc(docRef, {
                        shiftId: shift.id,
                        shiftCreatorId: shift.pharmacistId,
                        applicantId: user.id,
                        applicantEmail: user.email,
                        status: 'pending',
                        createdAt: new Date(),
                    });
                    console.log('Shift application created with ID: ', docRef.id);
                    return true;
                }
            }
        } catch (error) {
            console.error('Error applying for shift: ', error);
            throw error;
        }
    }
    


}


export default ShiftController;