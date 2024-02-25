import React from 'react'

const MyTertiaryButton = ({text, type}) => {
  return (
    <button type={type} className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg shadow-green-300'>
        {text}
    </button>
  )
}

export default MyTertiaryButton