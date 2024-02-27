import { firestore, auth } from '../../firebase/firebase.js';
import { doc, getDoc, getDocs, deleteDoc, setDoc, collection, query, orderBy } from 'firebase/firestore';
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

    // delete a shift from the remote database
    async deleteShift(shift) {
        try {
            const docRef = doc(firestore, 'shifts', shift.id);
            await deleteDoc(docRef);
            console.log('Shift deleted with ID: ', shift.id);
            return true;
        } catch (error) {
            console.error('Error deleting shift: ', error);
            throw error;
        }
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

    //Get all shifts created by a specific pharmacist
    async getAllShiftsByPharm (pharmacist) {
        try {
            const shifts = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'shifts'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                if (doc.data().pharmacistId === pharmacist.id) {
                    shifts.push(doc.data());
                }
            });
            return shifts;
        } catch (error) {
            console.error('Error getting shifts by Pharmacist: ', error);
            throw error;
        }
    }


    //get all shifts from db with filters
    async getShiftsByDateAndLocationFromRemoteDb (date, location) {
        try {
            const shifts = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'shifts'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                if (doc.data().location === location) {
                    if(date !== '' && date !== null && doc.data().date === date) {
                        shifts.push(doc.data());
                    } else if (date === '') {
                        shifts.push(doc.data());
                    }
                }
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
                        id: `${user.id}_${shift.id}`,
                        shiftId: shift.id,
                        shiftCreatorId: shift.pharmacistId,
                        shiftDate: shift.date,
                        shiftEndTime: shift.end,
                        shiftStartTime: shift.start,
                        shiftPlace: shift.place,
                        applicantId: user.id,
                        applicantEmail: user.email,
                        applicantName: `${user.firstname} ${user.lastname}`,
                        shiftLocation: shift.location,
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


    //Get shifts applied for by a specific user
    async getShiftsAppliedForByUser(user) {
        try {
            const applications = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'applications'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                if (doc.data().applicantId === user.id) {
                    applications.push(doc.data());
                }
            });
            return applications;
        } catch (error) {
            console.error('Error getting shift applications by a user: ', error);
            throw error;
        }
    }



    // Get all applications for shifts I posted that are not expired
    async getApplicationsForMyShifts(user) {
        try {
            const applications = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'applications'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                if (doc.data().shiftCreatorId === user.id) {
                    //check if shift is not expired using the date and end time
                    const shiftDate = new Date(doc.data().shiftDate); //storedFormat "2024-03-01" (string)
                    const shiftEndTimeParts = doc.data().shiftEndTime.split(':');  //storedFormat "21:45" (string)
                    shiftDate.setHours(shiftEndTimeParts[0], shiftEndTimeParts[1]); 
                    const currentTime = new Date();
                    if (shiftDate >= currentTime) {
                        //only show those whose status is pending
                        if (doc.data().status === 'pending') {
                            applications.push(doc.data());
                        }
                    }
                }
            });
            return applications;
        } catch (error) {
            console.error('Error getting applications: ', error);
            throw error;
        }
    }

    // Get all approved applications for shifts I posted
    async getApprovedApplicationsForMyShifts(user) {
        try {
            const applications = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'applications'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                if (doc.data().shiftCreatorId === user.id) {
                    //only show those whose status is approved
                    if (doc.data().status === 'approved') {
                        applications.push(doc.data());
                    }
                }
            });
            return applications;
        } catch (error) {
            console.error('Error getting applications: ', error);
            throw error;
        }
    }


    // get all rejected applications for shifts I posted
    async getRejectedApplicationsForMyShifts(user) {
        try {
            const applications = [];
            const querySnapshot = await getDocs(query(collection(firestore, 'applications'), orderBy('createdAt', 'desc')));
            querySnapshot.forEach((doc) => {
                if (doc.data().shiftCreatorId === user.id) {
                    //only show those whose status is rejected
                    if (doc.data().status === 'rejected') {
                        applications.push(doc.data());
                    }
                }
            });
            return applications;
        } catch (error) {
            console.error('Error getting applications: ', error);
            throw error;
        }
    }


    // reject a shift application
    async rejectShiftApplication(application) {
        try {
            const docRef = doc(firestore, 'applications', String(application.id));
            await setDoc(docRef, { status: 'rejected' }, { merge: true });
            console.log('Shift application rejected with ID: ', docRef.id);
            return true;
        } catch (error) {
            console.error('Error rejecting shift application: ', error);
            throw error;
        }
    }


    // approve a shift application
    async approveShiftApplication(application) {
        try {
            const docRef = doc(firestore, 'applications', String(application.id));
            await setDoc(docRef, { status: 'approved' }, { merge: true });
            console.log('Shift application approved with ID: ', docRef.id);
            return true;
        } catch (error) {
            console.error('Error approving shift application: ', error);
            throw error;
        }
    }


}


export default ShiftController;