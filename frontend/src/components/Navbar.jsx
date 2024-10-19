import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage
    const user = localStorage.getItem('user');
    
    if (user) {
      setIsLoggedIn(true);
      setUsername(user); // Assuming 'name' is part of the user object in localStorage
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/register'); // Redirect to login page after logout
    window.location.reload();
  };

  return (
    <div>
      <nav className="nav_section flex flex-row items-center justify-between bg-white-800 py-2">
        {/* Left side: Logo/Image */}
        <div className="flex items-center ml-5 mt-4">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Right side: Conditional display for logged-in user */}
        <div className="flex items-center mr-5">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 text-xl mr-4">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/contact">
              <button className="text-grey text-xl mr-20 mt-4 bg-[#5a4231] p-2 text-white rounded w-[80%]">
                Contact
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
