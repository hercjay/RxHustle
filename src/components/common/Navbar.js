
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white font-bold text-xl">RxHustle</Link>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/about" className="text-white">About</Link></li>
          <li className="relative">
            <button className="text-white">Services</button>
            <ul className="absolute bg-gray-900 rounded-lg p-2 top-full left-0 hidden">
              <li><Link to="/find-shifts" className="text-white">Find Shifts</Link></li>
              <li><Link to="/post-shifts" className="text-white">Post Shifts</Link></li>
            </ul>
          </li>
          <li className="relative">
            <button className="text-white">User Profile</button>
            <ul className="absolute bg-gray-900 rounded-lg p-2 top-full left-0 hidden">
              <li><Link to="/account-settings" className="text-white">Account Settings</Link></li>
              <li><Link to="/logout" className="text-white">Logout</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
