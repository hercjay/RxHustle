import React, { useContext } from 'react'
import MyButton from '../common/MyButton'
import MySecondaryButton from '../common/MySecondaryButton'
import MyTertiaryButton from '../common/MyTertiaryButton'
import ShiftController from '../../features/Shift/ShiftController'
import { LoadingContext } from '../../context/LoadingContext'

const MyAppliedShiftApplicationCard = ({application, user, moveToRejected, moveToApproved, isPending }) => {

    const { 
        isLoading, setIsLoading, isShowToast, setIsShowToast,
        toastType, setToastType, toastMessage, setToastMessage } = useContext(LoadingContext);

    const shiftController = new ShiftController();

    

  return (
    <div>
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-sky-700">Shift Application</h2>
                <p className="text-sm font-normal text-slate-500">Status: {application.status}</p>
            </div>
            <p className="text-sm font-normal text-slate-500">Place: {application.shiftPlace}</p>
            <p className="text-sm font-normal text-slate-500">Location: {application.shiftLocation}</p>
            <p className="text-sm font-normal text-slate-500">Shift Date: {application.shiftDate}</p>
            <p className="text-sm font-normal text-slate-500">Shift Start Time: {application.shiftStartTime}</p>
            <p className="text-sm font-normal text-slate-500">Shift End Time: {application.shiftEndTime}</p>
            {
                //isPending &&
                // <div className="flex justify-end gap-2 pt-4">
                //     <a title='Reachout to user to discuss further details'
                //         href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${application.applicantId}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`} target="_blank" rel="noopener noreferrer">
                //         <MyButton text="Mail User (Gmail)" />
                //     </a>
                //     <a onClick={approveShiftApplication}
                //         title='Do not forget to reach out to the user via mail after approving their application for further communication'>
                //         <MyTertiaryButton text="Approve" />
                //     </a>
                //     <a onClick={rejectShiftApplication} >
                //         <MySecondaryButton text="Reject" />
                //     </a>
                // </div>
            }
        </div>
    </div>
  )
}

export default MyAppliedShiftApplicationCard