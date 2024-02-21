import React, { useState, useEffect, useRef } from 'react';

const UserProfileDropdown = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
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
    <div className="relative inline-block">
      {user?.photo && (
        <button onClick={toggleDropdown} className="focus:outline-none">
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
          className="absolute right-0 mt-2 bg-white rounded-md shadow-lg"
        >
          <div className="py-1">
            <a
              href="#"
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Link 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Link 2
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
