import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa'; // Importing icons

const OTPVerified = () => {
  // State to check if OTPs are verified
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [isMobileVerified, setMobileVerified] = useState(false);

  // Dummy function to simulate verification process
  const verifyEmailOTP = () => {
    setEmailVerified(true); // Set the email OTP as verified
  };

  const verifyMobileOTP = () => {
    setMobileVerified(true); // Set the mobile OTP as verified
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">Lorem Ipsum is simply dummy text</p>

        {/* Email OTP Input */}
        <div className="flex items-center justify-between mb-4 border border-gray-300 rounded-lg p-2">
          <div className="flex items-center">
            <FaEnvelope className="text-gray-400 mr-2" /> {/* Email icon */}
            <input
              type="text"
              placeholder="Email OTP"
              className="w-full py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={isEmailVerified} // Disable if verified
            />
          </div>
          {/* Conditionally render checkmark if OTP is verified */}
          {isEmailVerified && <FaCheckCircle className="text-green-500" />}
        </div>

        <button
          onClick={verifyEmailOTP}
          className={`w-full py-2 rounded-lg mb-6 ${
            isEmailVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition duration-200`}
          disabled={isEmailVerified} // Disable button if verified
        >
          {isEmailVerified ? 'Verified' : 'Verify'}
        </button>

        {/* Mobile OTP Input */}
        <div className="flex items-center justify-between mb-4 border border-gray-300 rounded-lg p-2">
          <div className="flex items-center">
            <FaPhone className="text-gray-400 mr-2" /> {/* Mobile icon */}
            <input
              type="text"
              placeholder="Mobile OTP"
              className="w-full py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={isMobileVerified} // Disable if verified
            />
          </div>
          {/* Conditionally render checkmark if OTP is verified */}
          {isMobileVerified && <FaCheckCircle className="text-green-500" />}
        </div>

        <button
          onClick={verifyMobileOTP}
          className={`w-full py-2 rounded-lg ${
            isMobileVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition duration-200`}
          disabled={isMobileVerified} // Disable button if verified
        >
          {isMobileVerified ? 'Verified' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerified;
