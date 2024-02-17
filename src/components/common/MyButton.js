import React from 'react'

const MyButton = ({text}) => {
  return (
    <button className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded shadow-lg shadow-sky-300'>
        {text}
    </button>
  )
}

export default MyButton