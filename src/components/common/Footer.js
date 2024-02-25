import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-2">Rx Hustle</h2>
            <p className="mb-2">© 2024 RxHustle. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
                <a href="/post-shifts" className="hover:underline">Post a Shift</a>
                <a href="/find-shifts" className="hover:underline">Find a Shift</a>
            </div>
            <p>Developed by 
                <a className='text-sky-400 hover:underline font-bold ml-2'
                href='https://linkedin.com/in/michael-anokwulu' target='_blank'>
                    Hercjay Studios
                </a>
            </p>
        </div>
    </footer>
  )
}

export default Footer