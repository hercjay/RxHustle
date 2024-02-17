import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../components/common/MyButton'
import MyDatePicker from '../components/common/MyDatePicker'
import ShiftCard from '../components/ShiftCard/ShiftCard'
import { places } from '../constants/places'
import {shifts} from '../constants/shifts'

const FindShifts = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className='bg-slate-100 px-5 md:px-20'>
        <div className='pt-10'>

            <h2 className="font-bold text-4xl text-sky-700 text-center pb-10">
                The shift you need is just a search away!
            </h2>


            <div className='bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                
                <MyDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <select className='w-full mb-2 md:mb-0 p-2 rounded border border-gray-300'>
                    {places.map((place, index)=>(
                        <option key={index} value={place}>{place}</option>
                    ))}
                </select>
                
                <MyButton text='Find Shifts' />
                
            </div>
        </div>

        <div className='my-10 grid grid-cols-2 md:grid-cols-4 gap-4'>
            {/* display only the first eith shifts */}
            {shifts.map((shift, index) => (
                <ShiftCard key={index} shift={shift} />
            ))}
        </div>

    </div>
  )
}

export default FindShifts