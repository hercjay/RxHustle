import React from 'react'
import { PieChartFill as SpinIcon } from 'react-bootstrap-icons';


const LoadingOverlay = () => {
  return (
    <div className="loading-overlay h-full w-full bg-black bg-opacity-80 z-50 fixed flex justify-center items-center">
            <div> 
              <div className='flex items-center '>
                <SpinIcon className=' animate-ping text-sky-500 text-sm ' />
                <SpinIcon className=' animate-spin text-sky-500 text-4xl mx-4' />
                <SpinIcon className=' animate-ping text-sky-500 text-sm ' />
              </div>
              <p className='text-white text-center animate-pulse mt-4' >Please wait...</p>
            </div>
        </div>
  )
}

export default LoadingOverlay