import { createContext, useState, useEffect } from 'react';
import PharmacistController from '../features/Pharmacist/PharmacistController';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('This is a test message');
  const pharmacistController = new PharmacistController();


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

  return (
    <LoadingContext.Provider value={{ 
      isLoading, setIsLoading, user, setUser, isShowToast, 
      setIsShowToast, toastType, setToastType, toastMessage, 
      setToastMessage 
      }}>
      {children}
    </LoadingContext.Provider>
  );
};
