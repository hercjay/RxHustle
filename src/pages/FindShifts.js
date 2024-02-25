import React, { useState, useContext, useEffect } from 'react'
import MyButton from '../components/common/MyButton'
import MySecondaryButton from '../components/common/MySecondaryButton'
import ShiftCard from '../components/ShiftCard/ShiftCard'
import { locations } from '../constants/locations'
import ShiftController from '../features/Shift/ShiftController'
import { LoadingContext } from '../context/LoadingContext'
import { useNavigate } from 'react-router-dom'


const FindShifts = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shifts, setShifts] = useState([]);
  const { 
    isLoading, setIsLoading, isShowToast, setIsShowToast, 
    toastType, setToastType, toastMessage, setToastMessage } = useContext(LoadingContext);

  const shiftController = new ShiftController();
  
  useEffect(() => { 
    setIsLoading(true);
    shiftController.getAllShiftsFromRemoteDb().then((shifts) => {
            setShifts(shifts);
            setIsLoading(false);
            setToastType('success');
            setToastMessage('Shifts retrieved successfully');
            setIsShowToast(true);
        }).catch((error) => {
            console.error('Error getting shifts: ', error);
            setIsLoading(false);
            setToastType('error');
            setToastMessage('Error getting shifts from the database');
            setIsShowToast(true);
        }
    );
    }, []);

    const reloadPage = () => {
        window.location.reload();
    };


    const [formData, setFormData] = useState({
        date: '',
        location: locations[0],
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFilterShifts = () => {
        setIsLoading(true);
        shiftController.getShiftsByDateAndLocationFromRemoteDb(formData.date, formData.location).then((shifts) => {
            setShifts(shifts);
            setIsLoading(false);
            setToastType('success');
            setToastMessage('Shifts received and filtered successfully');
            setIsShowToast(true);
        }).catch((error) => {
            console.error('Error getting shifts: ', error);
            setIsLoading(false);
            setToastType('error');
            setToastMessage('Error getting shifts from the database. Try again later.');
            setIsShowToast(true);
        }
        );
    };

  return (
    <div className='bg-slate-100 px-5 md:px-20'>
        <div className='pt-10'>

            <h2 className="font-bold text-4xl text-sky-700 text-center pb-10">
                The shift you need is just a search away!
            </h2>


            <div className='bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                
                {/* <MyDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
            
                <input  onChange={handleChange} 
                    className='w-full mb-2 md:mb-0 p-2 rounded border border-gray-300'
                    type="date" id="date" name="date" value={formData.date} 
                />
                <select value={formData.location} onChange={handleChange} name="location"
                     className='w-full mb-2 md:mb-0 p-2 rounded border border-gray-300'>
                    {locations.map((location, index)=>(
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                
                <div className='flex gap-4'>
                    <div onClick = { handleFilterShifts } >
                        <MyButton text='Filter Shifts' />
                    </div>
                    <div onClick = { reloadPage } >
                        <MySecondaryButton text='Show All Shifts' />
                    </div>
                </div>

            </div>
        </div>

        <p className="text-lg text-sky-700 text-center pt-4">
            Total results: <span className='font-bold'>{shifts.length}</span>
        </p>

        <div className='mb-10 mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
            {shifts.map((shift, index) => (
                <ShiftCard key={index} shift={shift} />
            ))}
        </div>

    </div>
  )
}

export default FindShifts