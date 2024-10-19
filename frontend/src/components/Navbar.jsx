import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between p-4 bg-white-800">
      {/* Left side: Logo/Image */}
      <div className="flex items-center ml-5 mt-4">
        <img src={logo} alt="Logo" className="h-10" />
        {/* You can add additional logo text or links here */}
      </div>

      {/* Right side: Contact Button */}
      <div>
        <Link to="/contact">
          <button className=" text-grey text-xl p-2 mr-5 mt-4">
            Contact
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
