import { createContext, useState, useEffect } from 'react';
import PharmacistController from '../features/Pharmacist/PharmacistController';
import ShiftController from '../features/Shift/ShiftController';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('This is a test message');
  const pharmacistController = new PharmacistController();
  const [applicationsForMyShifts, setApplicationsForMyShifts] = useState([]);

  const shiftController = new ShiftController();

  useEffect(() => {
    pharmacistController.getLoggedInPharmacist().then((pharmacist) => {
      setUser(pharmacist);
      setIsLoading(false);
      console.log('Logged in pharmacist: ', pharmacist);
    }).catch((error) => {
      console.log('Error getting logged in pharmacist: ', error);
      setIsLoading(false);
    });
  }, []);


  useEffect(() => {
    if (user !== null) {
      setIsLoading(true);
      shiftController.getApplicationsForMyShifts(user).then((applications) => {
        setApplicationsForMyShifts(applications);
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setToastType('error');
        setToastMessage('Error getting applications for my shifts. Try again later');
        setIsShowToast(true);
      });
    }
  }
  , [user]);

  return (
    <LoadingContext.Provider value={{ 
      isLoading, setIsLoading, user, setUser, isShowToast, 
      setIsShowToast, toastType, setToastType, toastMessage, 
      setToastMessage, applicationsForMyShifts, setApplicationsForMyShifts
      }}>
      {children}
    </LoadingContext.Provider>
  );
};
