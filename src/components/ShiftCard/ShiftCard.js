import React from 'react'

const ShiftCard = ({shift}) => {
    const formattedDate = new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', year: 'numeric', day: 'numeric' });
    
    return (
        <div className='bg-white group hover:bg-sky-500 rounded-lg h-100 p-4 md:p-8 text-center hover:shadow-lg duration-500 animate-all'>
            <p className='text-sky-700 font-bold text-2xl mb-4 group-hover:text-white duration-500'>
                {shift.place}
            </p>
            <p className='text-sky-900 font-bold text-xl group-hover:text-slate-100 duration-500'>
                {formattedDate}
            </p>
            <p className='text-slate-500 text-md group-hover:text-slate-200 duration-500'>
                {shift.start} - {shift.end}
            </p>
            <p className='text-slate-500 text-md group-hover:text-slate-200 duration-500'>
                {shift.location}
            </p>
        </div>
    )
}

export default ShiftCard