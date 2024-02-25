import React,  { useContext, useEffect, useState } from 'react'
import { LoadingContext } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import ShiftController from '../features/Shift/ShiftController';
import ShiftApplicationCard from '../components/ShiftApplicationCard/ShiftApplicationCard';


const Dashboard = () => {

  const { 
    isLoading, setIsLoading, isShowToast, setIsShowToast, user,
    toastType, setToastType, toastMessage, setToastMessage } = useContext(LoadingContext);

  const [ applicationsForMyShifts , setApplicationsForMyShifts ] = useState([]);
  const [ approvedShiftApplications , setApprovedShiftApplications ] = useState([]);
  const [ rejectedShiftApplications , setRejectedShiftApplications ] = useState([]);

  const shiftController = new ShiftController();
  
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

        setIsLoading(true);
        shiftController.getApprovedApplicationsForMyShifts(user).then((applications) => {
          setApprovedShiftApplications(applications);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setToastType('error');
          setToastMessage('Error getting approved applications for my shifts. Try again later');
          setIsShowToast(true);
        });

        setIsLoading(true);
        shiftController.getRejectedApplicationsForMyShifts(user).then((applications) => {
          setRejectedShiftApplications(applications);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setToastType('error');
          setToastMessage('Error getting rejected applications for my shifts. Try again later');
          setIsShowToast(true);
        });
      }
    }
    , [user]);


    
    const pendingCount = applicationsForMyShifts.length;
    const approvedCount = approvedShiftApplications.length;
    const rejectedCount = rejectedShiftApplications.length;

  

  return (
    <div className='px-5 md:px-20 pt-10'>

      <h2 className="font-bold text-4xl text-sky-700 text-center pb-10">
          Welcome to your dashboard
      </h2>

      <p className="text-lg text-black text-start pb-2">
          Hello, Pharm. {user?.firstname} {user?.lastname}
      </p>



    {/* PENDING SHIFTS */}
      <h2 className="font-bold text-3xl text-sky-700">
          Pending Shift Applications To My Shifts
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { pendingCount <= 0 ? 'No pending shift applications' : 'You have ' + pendingCount + ' pending shift applications'} 
      </p>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-sky-100 p-4 rounded-lg'>
        {
          applicationsForMyShifts.map((application, index) => {
            return (
              <ShiftApplicationCard user={user} key={index} application = {application} />
            )
          })
        }
      </div>



      {/* APPROVED SHIFTS */}
      <h2 className="font-bold text-3xl text-sky-700 pt-8">
        Shift Applications I Approved
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { approvedCount <= 0 ? 'No approved shift applications' : 'You have ' + approvedCount + ' approved shift applications'} 
      </p>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-sky-100 p-4 rounded-lg'>
        {
          approvedShiftApplications.map((application, index) => {
            return (
              <ShiftApplicationCard user={user} key={index} application = {application} />
            )
          })
        }
      </div>



      {/* REJECTED SHIFTS */}
      <h2 className="font-bold text-3xl text-sky-700 pt-8">
        Shift Applications I Rejected
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { rejectedCount <= 0 ? 'No rejected shift applications' : 'You have ' + rejectedCount + ' rejected shift applications'} 
      </p>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-sky-100 p-4 rounded-lg'>
        {
          approvedShiftApplications.map((application, index) => {
            return (
              <ShiftApplicationCard user={user} key={index} application = {application} />
            )
          })
        }
      </div>




    </div>
  )
}

export default Dashboard