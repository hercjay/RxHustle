
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-bootstrap-icons';




const Navbar = () => {

    let links = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Find Shifts', url: '/find-shifts' },
        { name: 'Post Shifts', url: '/post-shifts' },
        { name: 'Account Settings', url: '/account-settings' },
        {name: 'Services', url: '/services' },
        { name: 'Logout', url: '/logout' },
    ];

    let [open,setOpen]=useState(false);

  return (
    <nav className="shadow-md w-full sticky top-0 left-0">
    
      <div className='md:flex items-center justify-between bg-teal-50 py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Titillium Web] 
        text-gray-800'>
            <span className='text-3xl mr-1 pt-2'>
            {/* <ion-icon name="logo-ionic"></ion-icon> */}
            </span>
            RxHustle
        </div>
        
        <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
        <Icons.List />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static bg-teal-50  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-14 ':'top-[-490px]'}`}>
            {
            links.map((link, index)=>(
                <li key={index} className='md:ml-8 text-xl md:my-0 my-7 font-[Titillium Web]' onClick={()=>setOpen(false)}>
                    <Link to={link.url} className='text-gray-800 hover:text-teal-500  transition all duration-500 font-[Titillium Web]'>{link.name}</Link>
                </li>
            ))
            }
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
