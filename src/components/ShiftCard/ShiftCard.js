import React from 'react';
import {CalendarCheck as CalendarIcon} from 'react-bootstrap-icons';
import {GeoAltFill as LocationIcon} from 'react-bootstrap-icons';
import {Clock as ClockIcon} from 'react-bootstrap-icons';

const ShiftCard = ({shift}) => {
    const formattedDate = new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', year: 'numeric', day: 'numeric' });
    
    return (
        <div className='bg-white group hover:bg-sky-500 rounded-lg h-100 p-4 md:p-8 hover:shadow-xl hover:shadow-sky-300 duration-500 animate-all flex flex-col justify-between'>
            
            <div>
                <p className='text-sky-700 font-bold text-2xl mb-4 group-hover:text-white duration-500'>
                    {shift.place}
                </p>
                <p className='text-sky-900 font-bold text-xl group-hover:text-slate-100 duration-500'>
                    <CalendarIcon className='inline mr-2' />{formattedDate}
                </p>
                <p className=' my-2 text-slate-500 text-md group-hover:text-slate-200 duration-500'>
                    <ClockIcon className='inline mr-2' />{shift.start} - {shift.end}
                </p>
                <p className='text-slate-500 text-md group-hover:text-slate-200 duration-500'>
                    <LocationIcon className='inline mr-2' />{shift.location}
                </p>
                <p className='text-sky-900 font-bold text-xl my-2 text-md group-hover:text-slate-200 duration-500'>
                    &#8358; {shift.rate} <span className=' text-sm '>/hour</span>
                </p>
                <p className='text-slate-500 text-md group-hover:text-slate-200 duration-500'>
                    Total: &#8358;{shift.total}
                </p>
            </div>

            <div className='mt-4'>
                <button className='w-full bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-sky-700 duration-500'>
                    Apply Now
                </button>
            </div>
            
        </div>
    )
}

export default ShiftCard