import React, { useContext } from 'react'
import PharmacistController from '../features/Pharmacist/PharmacistController';
import { LoadingContext } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(LoadingContext);
  const navigate = useNavigate();
  const pharmacistController = new PharmacistController();
  pharmacistController.logOut().then((user) => {
    setUser(null);
    navigate('/');
  });
  
}

export default Logout