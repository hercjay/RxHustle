import React from 'react'

const MySecondaryButton = ({text, type}) => {
  return (
    <button type={type} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg shadow-red-300'>
        {text}
    </button>
  )
}

export default MySecondaryButton