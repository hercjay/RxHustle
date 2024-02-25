
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List as ListIcon, X as XIcon} from 'react-bootstrap-icons';
import PharmacistController from '../../features/Pharmacist/PharmacistController';
import LoadingOverlay from './LoadingOverlay';
import { LoadingContext } from '../../context/LoadingContext';
import UserProfileDropdown from '../layout/UserProfileDropdown';
import Toast from './Toast';
import ShiftController from '../../features/Shift/ShiftController.js';




const  Navbar = () => {

    let defaultLinks = [
        { name: 'Home', url: '/' },
        //{ name: 'About', url: '/about' },
        { name: 'Find Shifts', url: '/find-shifts' },
        { name: 'Post Shifts', url: '/post-shifts' },
        //{name: 'Services', url: '/services' },
    ];

    const { 
      isLoading, setIsLoading, user, setUser, isShowToast,
      seIsShowToast, toastType, setToastType, 
      toastMessage, setToastMessage
    } = useContext(LoadingContext);
    

    const pharmacistController = new PharmacistController();
    const [links, setLinks] = useState(defaultLinks);

    const [ applicationsForMyShifts , setApplicationsForMyShifts ] = useState([]);
    const shiftController = new ShiftController();
  
    useEffect(() => {
      if (user !== null) {
        setIsLoading(true);
        shiftController.getApplicationsForMyShifts(user).then((applications) => {
          setApplicationsForMyShifts(applications);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setToastType('error');
          setToastMessage('Error getting applications for my shifts. Try again later');
          seIsShowToast(true);
        });
      }
    }
    , [user]);

    useEffect(() => {
      if(user === null) {
        setIsLoading(true);
        pharmacistController.getLoggedInPharmacist().then((pharmacist) => {
          setUser(pharmacist);
          setIsLoading(false);
          console.log('Logged in pharmacist: ', pharmacist);
        }).catch((error) => {
          console.log('Error getting logged in pharmacist: ', error);
          setIsLoading(false);
        });
      }
    }, []);
  
    useEffect(() => {
      if (user === null) {
        setLinks([...defaultLinks, { name: 'Login/SignUp', url: '/signup' }]); //{ name: 'Login', url: '/login' },
      } else {
        setLinks([...defaultLinks]);
      }
    }, [user]);

    let [open,setOpen]=useState(false);
   


  return (
    <nav className="shadow-md w-full sticky top-0 left-0 z-30">
      {isLoading && (
            <LoadingOverlay />
          )}
      {isShowToast && <Toast /> }
    
      <div className='md:flex items-center justify-between bg-sky-100 py-4 md:px-10 px-7'>
        <Link to='/' className='font-bold text-3xl cursor-pointer flex items-center font-[Titillium Web] 
        text-sky-700'>
            <span className='text-3xl mr-1 pt-2'>
            {/* <ion-icon name="logo-ionic"></ion-icon> */}
            </span>
            RxHustle
        </Link>
        
        <div className='text-3xl flex absolute right-8 top-5 cursor-pointer md:hidden'>
          <Link to='/dashboard' className='flex items-center mr-2 justify-center text-xs text-center text-white bg-red-600 rounded-full w-6 h-6 mt-1'>
              {applicationsForMyShifts.length > 99 ? '99+' : applicationsForMyShifts.length}
          </Link>
          {open ? <XIcon onClick={()=>setOpen(false)} /> : <ListIcon onClick={()=>setOpen(true)}/>}
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static bg-sky-100  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-14 ':'top-[-490px]'}`}>
            {
              links.map((link, index)=>(
                  <li key={index} className='md:ml-8 text-xl md:my-0 my-4 font-[Titillium Web]' onClick={()=>setOpen(false)}>
                      <Link to={link.url} className='text-gray-800 hover:bg-sky-200 hover:text-sky-500  transition all duration-500 font-[Titillium Web]'>{link.name}</Link>
                  </li>
              ))
            }
            {
              user !== null && 
              <div className=''>
                <div className='hidden absolute right-9 top-2 md:flex items-center justify-center text-xs text-center text-white bg-red-600 rounded-full w-6 h-6'>
                  {applicationsForMyShifts.length > 99 ? '99+' : applicationsForMyShifts.length}
                </div>
                <UserProfileDropdown user={user} count = {applicationsForMyShifts.length} />
              </div>
            }
        </ul>

      </div>

    </nav>
  );
};

export default Navbar;
