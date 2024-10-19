import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaUsers, FaPhoneAlt } from 'react-icons/fa'; // Importing icons

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [phoneOTP, setPhoneOTP] = useState('');
    const [emailOTP, setEmailOTP] = useState('');
    const [loading, setLoading] = useState(false); // New loading state
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when button is clicked
        localStorage.setItem('user', name);
        try {
            const response = await axios.post('https://asignment-cuvvet.onrender.com/api/auth/register', {
                name: name,
                email: companyEmail,
                phone: phone,
                companyname: companyName,
                companysize: companySize
            });
            alert(response.data.message);
            setOtpSent(true); // OTPs sent, show verification form
        } catch (err) {
            alert(err.response.data.message);
        } finally {
            setLoading(false); // Reset loading after API call completes
        }
    };

    const handleOTPVerify = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when button is clicked
        try {
            const response = await axios.post('https://asignment-cuvvet.onrender.com/api/auth/verify-email', {
                email: companyEmail,
                emailOTP,
            });
            alert(response.data.message);
            if (response.data.message === 'Email verified successfully.') {
                navigate('/jobsform');
                window.location.reload();
            }
        } catch (err) {
            alert(err.response.data.message);
        } finally {
            setLoading(false); // Reset loading after API call completes
        }
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="rounded-lg max-w-7xl w-full flex">
                {/* Left Side Text Section */}
                <div className="w-2/3 p-8 flex flex-col justify-center text-justify">
                    <h2 className="text-2xl font-bold mb-4 text-[#FAA6A4]">Welcome to Our Service</h2>
                    <p className="text-[#5a4231] text-[19px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere cumque, dignissimos distinctio eveniet repellat corporis libero, magnam a officia, harum nesciunt sed aliquid.
                    </p>
                    <p className="text-[#5a4231] text-[19px] mt-3">
                        Please fill out the form on the right to register and enjoy our services. We ensure your data is secure and protected.
                    </p>
                </div>
                
                {/* Right Side Form Section */}
                <div className="form_section w-1/3 bg-white p-8 mt-10">
                    <h2 className="text-2xl font-bold text-center text-[#FAA6A4]">{otpSent ? 'Verify OTPs' : 'Sign Up'}</h2>
                    <p className="text-center mb-5 text-[#5a4231]">Lorem Ipsum is simply dummy text</p>
                    <form onSubmit={otpSent ? handleOTPVerify : handleRegister}>
                        {/* Registration Fields */}
                        {!otpSent && (
                            <div className="space-y-4">
                                <div>
                                    <div className="all_inputsection flex items-center border border-gray-300 rounded">
                                        <FaUser className="ml-2" />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="mt-1 p-2 border-none rounded w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="all_inputsection flex items-center border border-gray-300 rounded">
                                        <FaPhoneAlt className="ml-2" />
                                        <input
                                            type="text"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            className="mt-1 p-2 border-none rounded w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="all_inputsection flex items-center border border-gray-300 rounded">
                                        <FaBuilding className="ml-2" />
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                            className="mt-1 p-2 border-none rounded w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="all_inputsection flex items-center border border-gray-300 rounded">
                                        <FaEnvelope className="ml-2" />
                                        <input
                                            type="text"
                                            placeholder="Company Email"
                                            value={companyEmail}
                                            onChange={(e) => setCompanyEmail(e.target.value)}
                                            required
                                            className="mt-1 p-2 border-none rounded w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="all_inputsection flex items-center border border-gray-300 rounded">
                                        <FaUsers className="ml-2" />
                                        <input
                                            type="text"
                                            placeholder="Company Size"
                                            value={companySize}
                                            onChange={(e) => setCompanySize(e.target.value)}
                                            required
                                            className="mt-1 p-2 border-none rounded w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p>By clicking on proceed you will accept our</p>
                                    <p><span className="text-blue-500 cursor-pointer">Terms</span> and <span className="text-blue-500 cursor-pointer">Conditions</span></p>
                                </div>
                            </div>
                        )}
                        {/* OTP Verification Fields */}
                        {otpSent && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone OTP</label>
                                    <input
                                        type="text"
                                        placeholder="Phone OTP"
                                        value={phoneOTP}
                                        onChange={(e) => setPhoneOTP(e.target.value)}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email OTP</label>
                                    <input
                                        type="text"
                                        placeholder="Email OTP"
                                        value={emailOTP}
                                        onChange={(e) => setEmailOTP(e.target.value)}
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading} // Disable button while loading
                            className={`mt-6 w-full py-2 text-white font-semibold rounded transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                        >
                            {loading ? 'Wait...' : otpSent ? 'Verify OTPs' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
