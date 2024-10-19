import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import OTPVerification from './pages/OTPVerification';
import OTPVerified from './pages/OTPVerified';
import JobForm from './pages/JobForm';
import './App.css';
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Register />}  />
                    <Route path="/otpverification" element={<OTPVerification/>}/>
                    <Route path="/otpverified" element={<OTPVerified/>}/>
                    <Route path="/jobsform" element={<JobForm />} />

                    <Route path="/login" element={<Login />} />
                   
                </Routes>
            </Router>
        </div>
    );
}

export default App;
