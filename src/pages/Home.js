import React, { useState } from 'react';
import { places } from '../constants/places.js';
import {shifts} from '../constants/shifts.js';
import ShiftCard from '../components/ShiftCard/ShiftCard.js';
import MyDatePicker from '../components/common/MyDatePicker.js';
import MyButton from '../components/common/MyButton.js';
import { Link } from 'react-router-dom';




const Home = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='bg-slate-100 px-5 md:px-20'>
            
            <h2 className="font-bold text-4xl text-sky-700 text-center pt-10">
                The perfect place for you to find or post shifts!
            </h2>

            <p className="text-lg text-gray-600 mt-4 leading-relaxed text-start">
                Welcome to RxHustle, the perfect platform for you to discover and advertise shifts in your area. Whether you're a Pharmacist seeking opportunities or a Pharmacy in need of staffing solutions, RxHustle provides a seamless experience to connect you with the solution you need. <br/>Browse through a wide range of shifts available in your locality or effortlessly post your vacancies to attract qualified professionals. <br/>Join our community today and simplify your shift management process with RxHustle.
            </p>


            <div className='my-10'>
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
                {shifts.slice(0, 8).map((shift, index) => (
                    <ShiftCard key={index} shift={shift} />
                ))}
            </div>

            <Link to='/find-shifts' className='grid grid-cols-1 md:grid-cols-3'>
                <div></div>
                <MyButton text='See All Shifts' />
                <div></div>
            </Link>

        </div>
    )
}

export default Home