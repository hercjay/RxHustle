import React, { useContext } from 'react';
import {CalendarCheck as CalendarIcon} from 'react-bootstrap-icons';
import {GeoAltFill as LocationIcon} from 'react-bootstrap-icons';
import {Clock as ClockIcon} from 'react-bootstrap-icons';
import ShiftController from '../../features/Shift/ShiftController';
import { LoadingContext } from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import MySecondaryButton from '../common/MySecondaryButton';

const ShiftCardWithAdmin = ({shift, removeShiftFromState }) => {
    const formattedDate = new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', year: 'numeric', day: 'numeric' });
    const shiftController = new ShiftController();
    const total = shiftController.calculateTotal(shift);
    const { user, setIsLoading, isShowToast, setIsShowToast, setToastMessage, setToastType } = useContext(LoadingContext);
    const navigate = useNavigate();


    const deleteShift = () => {
        setIsLoading(true);
        shiftController.deleteShift(shift).then((value) => {
            if(value === true) {
                setToastType('success');
                setToastMessage('Shift has been deleted successfully');
                setIsShowToast(true);
                removeShiftFromState(shift);
                setIsLoading(false);
            } else {
                setToastType('error');
                setToastMessage(value);
                setIsShowToast(true);
                setIsLoading(false);
            }
        }
        ).catch((error) => {
            setIsLoading(false);
            setToastType('error');
            setToastMessage('There was an error while deleting this shift. Try again later.');
            setIsShowToast(true);
        }
        );
    }
    
    return (
        <div className='bg-white group rounded-lg h-100 p-4 md:p-8 hover:shadow-xl hover:shadow-red-300 duration-500 animate-all flex flex-col justify-between'>
            
            <div>
                <p className='text-sky-700 font-bold text-2xl mb-4 duration-500'>
                    {shift.place}
                </p>
                <p className='text-sky-900 font-bold text-xl duration-500'>
                    <CalendarIcon className='inline mr-2' />{formattedDate}
                </p>
                <p className=' my-2 text-slate-500 text-md  duration-500'>
                    <ClockIcon className='inline mr-2' />{shift.start} - {shift.end}
                </p>
                <p className='text-slate-500 text-md  duration-500'>
                    <LocationIcon className='inline mr-2' />{shift.location}
                </p>
                <p className='text-sky-900 font-bold text-xl my-2 text-md  duration-500'>
                    &#8358; {shift.rate} <span className=' text-sm '>/hour</span>
                </p>
                <p className='text-slate-500 text-md  duration-500 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                    Total: &#8358;{total}
                </p>
            </div>

            <div className='mt-4 flex justify-end' onClick={deleteShift}>
                <MySecondaryButton text='Delete'  />
            </div>
            
        </div>
    )
}

export default ShiftCardWithAdmin