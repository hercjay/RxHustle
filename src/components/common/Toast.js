import React, { useContext, useEffect } from 'react';
import { PieChartFill as SpinIcon } from 'react-bootstrap-icons';
import { LoadingContext } from '../../context/LoadingContext';

const Toast = ({}) => {

const { toastType, toastMessage, isShowToast, setIsShowToast } = useContext(LoadingContext);

useEffect(() => {
    const timeout = setTimeout(() => {
        setIsShowToast(false);
    }, 2500);

    return () => clearTimeout(timeout);
}, []);

if (!isShowToast) {
    return null;
}

  return (
    <div className='flex justify-center text-center'>
        <div className={ `px-4 fixed w-[80%] top-5 py-2 rounded-lg loading-overlay bg-opacity-90 z-50 flex justify-center items-center 
            ${toastType == "success" ? 'bg-green-800 ':'bg-red-800'}` }>
            <SpinIcon className= {` ${toastType == "success" ? 'text-green-500 ':'text-red-500'} animatex-pulse text-green-500 text-xl mr-4`} />
            <p className='text-white text-center' >{toastMessage}</p>
        </div>
    </div>
  )
}

export default Toast