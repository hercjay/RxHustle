import React from 'react'
import PharmacistController from '../features/Pharmacist/PharmacistController';

const Logout = () => {
  const pharmacistController = new PharmacistController();
  pharmacistController.logOut();
  return (
    <div>Logout</div>
  )
}

export default Logout