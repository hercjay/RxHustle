import React, { useContext } from 'react'
import MyButton from '../common/MyButton'
import MySecondaryButton from '../common/MySecondaryButton'
import MyTertiaryButton from '../common/MyTertiaryButton'
import ShiftController from '../../features/Shift/ShiftController'
import { LoadingContext } from '../../context/LoadingContext'

const ShiftApplicationCard = ({application, user, moveToRejected, moveToApproved, isPending }) => {

    const { 
        isLoading, setIsLoading, isShowToast, setIsShowToast,
        toastType, setToastType, toastMessage, setToastMessage } = useContext(LoadingContext);

    const shiftController = new ShiftController();

    const approveShiftApplication = () => {
        setIsLoading(true);
        shiftController.approveShiftApplication(application).then((response) => {
            setIsLoading(false);
            moveToApproved(application);
            setToastType('success');
            setToastMessage('Shift application approved successfully. Do NOT forget to reach out to the user via mail for further communication');
            setIsShowToast(true);
        }).catch((error) => {
            setIsLoading(false);
            setToastType('error');
            setToastMessage('Error approving shift application. Try again later');
            setIsShowToast(true);
        });
    };

    const rejectShiftApplication = () => {
        setIsLoading(true);
        shiftController.rejectShiftApplication(application).then((response) => {
            setIsLoading(false);
            moveToRejected(application);
            setToastType('success');
            setToastMessage('Shift application rejected successfully');
            setIsShowToast(true);
        }).catch((error) => {
            setIsLoading(false);
            setToastType('error');
            setToastMessage('Error rejecting shift application. Try again later');
            setIsShowToast(true);
        });
    };


    const subject = `Regarding Your Shift Application for ${application.shiftDate} on RxHustle`;
    const body = `Dear Pharm. ${application.applicantName},

        We have received your application for the shift with details below:

        Facility: ${application.shiftPlace}
        Location: ${application.shiftLocation}
        Date: ${application.shiftDate}
        Start Time: ${application.shiftStartTime}
        End Time: ${application.shiftEndTime}
        Advertised by: Pharm. ${user.firstname} ${user.lastname}

        We will review your application and get back to you soon.

        Best regards,
        Pharm. ${user.firstname} ${user.lastname},
        ${application.shiftPlace}, ${application.shiftLocation}
    `;

  return (
    <div>
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-sky-700">Shift Application</h2>
                <p className="text-sm font-normal text-slate-500">Status: {application.status}</p>
            </div>
            <p className="text-sm font-normal text-slate-500">Shift Date: {application.shiftDate}</p>
            <p className="text-sm font-normal text-slate-500">Shift Start Time: {application.shiftStartTime}</p>
            <p className="text-sm font-normal text-slate-500">Shift End Time: {application.shiftEndTime}</p>
            <p className="text-sm font-normal text-slate-500">Applicant: <strong>{application.applicantName}</strong> ({application.applicantId})</p>
            {
                isPending &&
                <div className="flex justify-end gap-2 pt-4">
                    {/* <a href={`mailto:${application.applicantId}`}>
                        <MyButton text="Mail Applicant (Default)" />
                    </a> */}
                    <a title='Reachout to user to discuss further details'
                        href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${application.applicantId}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`} target="_blank" rel="noopener noreferrer">
                        <MyButton text="Mail User (Gmail)" />
                    </a>
                    <a onClick={approveShiftApplication}
                        title='Do not forget to reach out to the user via mail after approving their application for further communication'>
                        <MyTertiaryButton text="Approve" />
                    </a>
                    <a onClick={rejectShiftApplication} >
                        <MySecondaryButton text="Reject" />
                    </a>
                </div>
            }
        </div>
    </div>
  )
}

export default ShiftApplicationCard