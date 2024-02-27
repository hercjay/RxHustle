import React,  { useContext, useEffect, useState } from 'react'
import { LoadingContext } from '../context/LoadingContext';
import { Link, useNavigate } from 'react-router-dom';
import ShiftController from '../features/Shift/ShiftController';
import ShiftApplicationCard from '../components/ShiftApplicationCard/ShiftApplicationCard';
import MyAppliedShiftApplicationCard from '../components/ShiftApplicationCard/MyAppliedShiftApplicationCard';
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
  const [ appliedShifts, setAppliedShifts ] = useState([]);
  const [ appliedCount, setAppliedCount ] = useState(0);
  const [ pendingCount, setPendingCount ] = useState(0);
  const [ approvedCount, setApprovedCount ] = useState(0);
  const [ rejectedCount, setRejectedCount ] = useState(0);
  const [ shiftsCreatedByMe, setShiftsCreatedByMe ] = useState([]);
  const [ shiftsCount, setShiftsCount ] = useState(0);
  

  const shiftController = new ShiftController();
  const navigate = useNavigate();
  
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

        setIsLoading(true);
        shiftController.getShiftsAppliedForByUser(user).then((applications) => {
          setAppliedShifts(applications);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setToastType('error');
          setToastMessage('Error getting shifts you applied for. Try again later');
          setIsShowToast(true);
        });

      } else {
        navigate('/signup');
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

    useEffect(() => {
      setAppliedCount(appliedShifts.length);
    }
    , [appliedShifts]);






  

  return (
    <div className='px-5 md:px-20 pt-10'>

      <h2 className="font-bold text-4xl text-sky-700 text-center pb-10">
          Welcome to your dashboard
      </h2>

      <p className="text-lg text-black text-start pb-2">
          Hello, Pharm. {user?.firstname} {user?.lastname}
      </p>


      {/*  SHIFTS I APPLIED FOR */}
      <h2 className="font-bold mt-8 text-2xl text-sky-700">
          Shifts I Applied For
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { appliedCount <= 0 ? 'You have not applied to any shifts' : 'You have applied to ' + appliedCount + '  shifts'} 
      </p>

      <div className='w-full mb-8 overflow-x-auto flex gap-4 m-4 bg-sky-100 p-4 rounded-lg'>
        {
          appliedShifts.map((application, index) => {
            const color = application.status === 'approved' ? 'bg-green-500' : application.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500';
            const shadowColor = application.status === 'approved' ? 'shadow-green-300' : application.status === 'rejected' ? 'shadow-red-300' : 'shadow-yellow-300';
            return (
              <div className={ `shadow-lg min-w-[60vw]  md:min-w-[40vw] lg:min-w-[20vw] rounded-lg p-2 ${color} ${shadowColor}`}>
                  <MyAppliedShiftApplicationCard user={user} key={index} 
                    application = {application} moveToApproved={() => moveToApproved(application)}
                    moveToRejected={() => moveToRejected(application)}
                    isPending={false}
                  />
              </div>
            )
          })
        }
      </div>



    {/* PENDING SHIFTS */}
      <h2 className="font-bold text-2xl text-sky-700">
          Pending Applications To My Shifts
      </h2>
      <p className="text-sm font-normal text-slate-500">
       { pendingCount <= 0 ? 'No pending applications to your shifts' : 'You have ' + pendingCount + ' pending applications to your shifts'} 
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
       { approvedCount <= 0 ? 'You have approved no applications to your shifts' : 'You have approved ' + approvedCount + ' applications to your shifts'} 
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
       { rejectedCount <= 0 ? 'You have not rejected any applications to your shifts' : 'You have rejected ' + rejectedCount + ' applications to your shifts'} 
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