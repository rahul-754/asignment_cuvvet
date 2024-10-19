const Company = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Register a Company
exports.registerCompany = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        let company = await Company.findOne({ email });
        if (company) return res.status(400).json({ message: 'Company already exists' });

        company = new Company({ name, email, phone, password });
        await company.save();

        // Send verification email
        const verificationLink = `http://localhost:5000/api/auth/verify-email/${company._id}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            text: `Click the link to verify your email: ${verificationLink}`,
        };
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Registration successful. Please verify your email.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ message: 'Company not found' });

        company.verified = true;
        await company.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email });
        if (!company) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        if (!company.verified) return res.status(400).json({ message: 'Email not verified' });

        const token = generateToken(company._id);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
