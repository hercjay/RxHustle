import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserProfileDropdown = ({ user, count }) => {

    let userDropdownLinks = [
        { name: 'Dashboard', url: '/dashboard' },
        { name: 'Profile', url: '/my-profile' },
    ];


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profilePhotoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profilePhotoRef.current !== event.target
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {user?.photo && (
        <button ref={profilePhotoRef} onClick={toggleDropdown} className="focus:outline-none">
          <img
            src={user.photo}
            alt="user"
            className="md:ml-8 w-10 h-10 rounded-full cursor-pointer"
          />
        </button>
      )}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="md:absolute  md:right-5 mt-2 bg-sky-200 flex md:rounded-md shadow-lg"
        >
          <div className="py-1">
            <Link to='/dashboard' onClick={() => setIsDropdownOpen(false)}
                className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
                My Dashboard {count > 0 && <span className="text-white text-xs bg-red-500 px-2 rounded-sm">{count > 99 ? '99+' : count}</span>}
            </Link>
            <Link to='/edit-profile' onClick={() => setIsDropdownOpen(false)}
                className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
                Edit Profile
            </Link>
            <Link to='/logout' onClick={() => setIsDropdownOpen(false)}
                className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
                Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
