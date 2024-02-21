
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List as ListIcon, X as XIcon} from 'react-bootstrap-icons';
import PharmacistController from '../../features/Pharmacist/PharmacistController';
import LoadingOverlay from './LoadingOverlay';
import { LoadingContext } from '../../context/LoadingContext';
import UserProfileDropdown from '../layout/UserProfileDropdown';




const  Navbar = () => {

    let defaultLinks = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Find Shifts', url: '/find-shifts' },
        { name: 'Post Shifts', url: '/post-shifts' },
        {name: 'Services', url: '/services' },
    ];

    const { isLoading } = useContext(LoadingContext);
    

    const pharmacistController = new PharmacistController();

    const [user, setUser] = useState(null);
    const [links, setLinks] = useState(defaultLinks);
  
    useEffect(() => {
      pharmacistController.getLoggedInPharmacist().then((pharmacist) => {
        setUser(pharmacist);
        console.log('Logged in pharmacist: ', pharmacist);
      }).catch((error) => {
        console.log('Error getting logged in pharmacist: ', error);
      });
    }, []);
  
    useEffect(() => {
      if (user === null) {
        setLinks([...defaultLinks, { name: 'Login', url: '/login' }]);
      } else {
        setLinks([...defaultLinks, { name: 'Logout', url: '/logout' }, { name: 'Dashboard', url: '/dashboard' }]);
      }
    }, [user]);

    let [open,setOpen]=useState(false);
   


  return (
    <nav className="shadow-md w-full sticky top-0 left-0 z-30">
      {isLoading && (
            <LoadingOverlay />
          )}
    
      <div className='md:flex items-center justify-between bg-sky-100 py-4 md:px-10 px-7'>
        <Link to='/' className='font-bold text-3xl cursor-pointer flex items-center font-[Titillium Web] 
        text-sky-700'>
            <span className='text-3xl mr-1 pt-2'>
            {/* <ion-icon name="logo-ionic"></ion-icon> */}
            </span>
            RxHustle
        </Link>
        
        <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-5 cursor-pointer md:hidden'>
        {open ? <XIcon /> : <ListIcon />}
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static bg-sky-100  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-14 ':'top-[-490px]'}`}>
            {
            links.map((link, index)=>(
                <li key={index} className='md:ml-8 text-xl md:my-0 my-4 font-[Titillium Web]' onClick={()=>setOpen(false)}>
                    <Link to={link.url} className='text-gray-800 hover:text-sky-500  transition all duration-500 font-[Titillium Web]'>{link.name}</Link>
                </li>
            ))
            }
            {
              user !== null && <UserProfileDropdown user={user} />
            }
        </ul>


      </div>

    </nav>
  );
};

export default Navbar;
