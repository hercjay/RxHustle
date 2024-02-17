import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const MyDatePicker = ({selectedDate, setSelectedDate}) => {
    // Custom input component
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <input 
        onClick={onClick}
        value={value}
        ref={ref}
        className="w-full p-2 " //focus:outline-none
        />
    ));


  return (
    <div className=' justify-center items-center mb-2 md:mb-0 md:mr-2 rounded border border-gray-300 w-full'>
        <DatePicker 
            wrapperClassName='w-full'
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
            customInput={<CustomInput />}
        />
    </div>
  )
}

export default MyDatePicker