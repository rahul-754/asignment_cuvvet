import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa'; // Importing the necessary icons

const OTPVerification = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">Lorem Ipsum is simply dummy text</p>

        {/* Email OTP Input */}
        <div className="flex items-center mb-4 border border-gray-300 rounded-lg">
          <FaEnvelope className="px-4 text-gray-400" /> {/* React Icon for email */}
          <input
            type="text"
            name="emailOtp"
            placeholder="Email OTP"
            className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 "
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-6 hover:bg-blue-700 transition duration-200">
          Verify
        </button>

        {/* Mobile OTP Input */}
        <div className="flex items-center mb-4 border border-gray-300 rounded-lg">
          <FaPhone className="px-4 text-gray-400" /> {/* React Icon for mobile */}
          <input
            type="text"
            name="mobileOtp"
            placeholder="Mobile OTP"
            className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 "
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
