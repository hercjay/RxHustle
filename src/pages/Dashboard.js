import React,  { useContext, useEffect, useState } from 'react'
import { LoadingContext } from '../context/LoadingContext';
import { Link } from 'react-router-dom';
import ShiftController from '../features/Shift/ShiftController';
import ShiftApplicationCard from '../components/ShiftApplicationCard/ShiftApplicationCard';
import ShiftCardWithAdmin from '../components/ShiftCard/ShiftCardWithAdmin';
import MyTertiaryButton from '../components/common/MyTertiaryButton';


const Dashboard = () => {

  const { 
    isLoading, setIsLoading, isShowToast, setIsShowToast, user,
    toastType, setToastType, toastMessage, setToastMessage,
    applicationsForMyShifts , setApplicationsForMyShifts
   } = useContext(LoadingContext);

  const [ approvedShiftApplications , setApprovedShiftApplications ] = useState([]);
  const [ rejectedShiftApplications , setRejectedShiftApplications ] = useState([]);
  const [ pendingCount, setPendingCount ] = useState(0);
  const [ approvedCount, setApprovedCount ] = useState(0);
  const [ rejectedCount, setRejectedCount ] = useState(0);
  const [ shiftsCreatedByMe, setShiftsCreatedByMe ] = useState([]);
  const [ shiftsCount, setShiftsCount ] = useState(0);

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

        setIsLoading(true);
        shiftController.getAllShiftsByPharm(user).then((shifts) => {
          setShiftsCreatedByMe(shifts);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setToastType('error');
          setToastMessage('Error getting shifts created by you. Try again later');
          setIsShowToast(true);
        });
      }
    }
    , [user]);


    const moveToApproved = (application) => {
      setApplicationsForMyShifts(
        applicationsForMyShifts.filter((app) => app.id !== application.id)
      );
      const newApplication = { ...application, status: 'approved' };
      setApprovedShiftApplications([...approvedShiftApplications, newApplication]);
    };

    const moveToRejected = (application) => {
      setApplicationsForMyShifts(
        applicationsForMyShifts.filter((app) => app.id !== application.id)
      );
      const newApplication = { ...application, status: 'rejected' };
      setRejectedShiftApplications([...rejectedShiftApplications, newApplication]);
    };

    const removeShiftFromState = (shift) => {
      setShiftsCreatedByMe(
        shiftsCreatedByMe.filter((s) => s.id !== shift.id)
      );
    }

    useEffect(() => {
      setPendingCount(applicationsForMyShifts.length);
    }, [applicationsForMyShifts]);

    useEffect(() => {
      setApprovedCount(approvedShiftApplications.length);
    }, [approvedShiftApplications]);

    useEffect(() => {
      setRejectedCount(rejectedShiftApplications.length);
    }, [rejectedShiftApplications]);

    useEffect(() => {
      setShiftsCount(shiftsCreatedByMe.length);
    }
    , [shiftsCreatedByMe]);






  

  return (
    <div className='px-5 md:px-20 pt-10'>

      <h2 className="font-bold text-4xl text-sky-700 text-center pb-10">
          Welcome to your dashboard
      </h2>

      <p className="text-lg text-black text-start pb-2">
          Hello, Pharm. {user?.firstname} {user?.lastname}
      </p>



    {/* PENDING SHIFTS */}
      <h2 className="font-bold text-2xl text-sky-700">
          Pending Applications To My Shifts
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { pendingCount <= 0 ? 'No pending shift applications' : 'You have ' + pendingCount + ' pending shift applications'} 
      </p>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-sky-100 p-4 rounded-lg'>
        {
          applicationsForMyShifts.map((application, index) => {
            return (
              <ShiftApplicationCard user={user} 
                key={index} application = {application} 
                moveToApproved={() => moveToApproved(application)}
                moveToRejected={() => moveToRejected(application)}
                isPending={true}
              />
            )
          })
        }
      </div>



      {/* APPROVED SHIFTS */}
      <h2 className="font-bold mt-8 text-2xl text-sky-700">
          Approved Applications To My Shifts
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { approvedCount <= 0 ? 'No approved shift applications' : 'You have ' + approvedCount + ' approved shift applications'} 
      </p>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-sky-100 p-4 rounded-lg'>
        {
          approvedShiftApplications.map((application, index) => {
            return (
              <ShiftApplicationCard user={user} key={index} 
              application = {application} 
              moveToApproved={() => moveToApproved(application)}
                moveToRejected={() => moveToRejected(application)}
                isPending={false}
              />
            )
          })
        }
      </div>



      {/* REJECTED SHIFTS */}
      <h2 className="font-bold mt-8 text-2xl text-sky-700">
          Rejected Applications To My Shifts
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { rejectedCount <= 0 ? 'No rejected shift applications' : 'You have ' + rejectedCount + ' rejected shift applications'} 
      </p>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-sky-100 p-4 rounded-lg'>
        {
          rejectedShiftApplications.map((application, index) => {
            return (
              <ShiftApplicationCard user={user} key={index} 
                application = {application} moveToApproved={() => moveToApproved(application)}
                moveToRejected={() => moveToRejected(application)}
                isPending={false}
              />
            )
          })
        }
      </div>



      {/* Shifts Created by Me */}
      <h2 className="font-bold mt-8 text-2xl text-sky-700">
          Shifts Created by You
      </h2>
      <p className="text-sm font-normal text-slate-500 mb-4">
       { shiftsCount <= 0 ? 'You have no active shifts created' : 'You have ' + shiftsCount + ' shifts created'} 
      </p>

      <Link to="/post-shifts" >
          <MyTertiaryButton text='Create a New Shift'  />
      </Link>

      <div className='grid mt-4 gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 bg-sky-100 p-4 rounded-lg'>
        {
          shiftsCreatedByMe.map((shift, index) => {
            return (
              <ShiftCardWithAdmin shift={shift} key={index} 
                removeShiftFromState={() => removeShiftFromState(shift)}
              />
            )
          })
        }
      </div>




    </div>
  )
}

export default Dashboard