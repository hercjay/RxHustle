import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import ShiftController from '../features/Shift/ShiftController.js';
import { locations } from '../constants/locations.js';
import MyButton from '../components/common/MyButton.js';

const PostShifts = () => {

  const { user, isLoading, setIsLoading } = useContext(LoadingContext);
  const [ shouldRedirect, setShouldRedirect ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user == null) {
      setShouldRedirect(true);
    } else { 
      setShouldRedirect(false);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/signup');
    }
  }, [shouldRedirect]);

  const [formData, setFormData] = useState({
    place: '',
    date: '',
    start: '',
    end: '',
    location: locations[0],
    rate: '',
    pharmacistId: user.id,
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const shiftController = new ShiftController();
      const shift = shiftController.createShift(formData);
      shiftController.addShiftToRemoteDb(shift).then((shift)=> {
        setIsLoading(false);
        alert('Shift posted successfully!');
        console.log('Shift posted successfully: ', shift);
        //navigate('/dashboard');
      }).catch((error)=>{
        setIsLoading(false);
        alert('Failed to save shift. Try again later.');
        console.error('Error posting shift: ', error);
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Error posting shift: ', error);
      alert('Error posting shift. Please try again.');
    }
  };




  return (
      <div className='py-8 px-5 md:px-20'>
        <h1 className='text-3xl text-sky-700 mb-4 font-bold'>Post a new Shift</h1>
          <form onSubmit={handleSubmit} className='p-4 bg-sky-100 grid sm:grid-col-1  md:grid-cols-2 lg:grid-cols-3'>
            <div className='w-full flex  items-center gap-2'>
              <label htmlFor="place" className='w-20 text-end'>Place / Pharmacy:</label>
              <input className='mb-2 md:mb-0 flex-grow'
                type="text" id="place" name="place" value={formData.place} onChange={handleChange} required />
            </div>
            <div className='w-full flex  items-center gap-2'>
              <label htmlFor="location" className='w-20 text-end'>Location:</label>
              <select id="location" name="location" value={formData.location} onChange={handleChange} required 
                  className='mb-2 md:mb-0 flex-grow'>
                  {locations.map((location, index)=>(
                      <option key={index} value={location}>{location}</option>
                  ))}
              </select>
            </div>
            <div className='w-full flex  items-center gap-2'>
              <label htmlFor="date" className='w-20 text-end'>Date:</label>
              <input 
                className='mb-2 md:mb-0 flex-grow'
                type="date" id="date" name="date" value={formData.date} 
                onChange={handleChange} required />
            </div>
            <div className='w-full flex  items-center gap-2'>
              <label htmlFor="start" className='w-20 text-end'>Start Time:</label>
              <input className='mb-2 md:mb-0 flex-grow'
                type="time" id="start" name="start" value={formData.start} onChange={handleChange} required />
            </div>
            <div className='w-full flex  items-center gap-2'>
              <label htmlFor="end" className='w-20 text-end'>End Time:</label>
              <input className='mb-2 md:mb-0 flex-grow'
                type="time" id="end" name="end" value={formData.end} onChange={handleChange} required />
            </div>
            <div className='w-full flex  items-center gap-2'>
              <label htmlFor="rate" className='w-20 text-end'>Rate (&#8358; per hour):</label>
              <input className='mb-2 md:mb-0 flex-grow'
                type="number" id="rate" name="rate" value={formData.rate} onChange={handleChange} required />
            </div>
            <div className='w-full my-4 text-center md:col-span-2 lg:col-span-3'>
              <MyButton text='Post Shift' type='submit' />
            </div>
        </form>
    </div>
  )
}

export default PostShifts