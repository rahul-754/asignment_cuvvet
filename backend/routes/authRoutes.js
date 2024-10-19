const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const firebase = require('./firebaseConfig');

// Setup Nodemailer

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
// const sendOTPEmail = async (email, otp) => {
//     try {
//         const mailOptions = {
//             from: process.env.GMAIL_USER,
//             to: email,
//             subject: 'Your OTP Code',
//             text: `Your OTP code is ${otp}`,
//         };
//         await transporter.sendMail(mailOptions);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// Register user and send OTP to email
// Register user and send OTPs to phone and email
router.post('/register', [
    body('email').isEmail(),
    body('phone').isLength({ min: 10 }),
    body('companyname').not().isEmpty(),
    body('companysize').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, companyname, companysize } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTPs for phone and email
        const phoneOTP = generateOTP();
        const emailOTP = generateOTP();

        // Create user but mark inactive until both OTPs are verified
        user = new User({
            name,
            email,
            phone,
            companyname,
            companysize,
            phoneOTP,
            emailOTP,
            phoneVerified: false,
            emailVerified: false,
            isActive: false
        });
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            text: `Your otp for the email verification : ${emailOTP}`,
        };
        await transporter.sendMail(mailOptions);
        try {
            await transporter.sendMail(mailOptions); // Use await for the sendMail
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email: ', error);
            return res.status(500).json({ message: 'Error sending email' }); // Handle error
        }

        // Send OTP via Twilio for phone (if you had Twilio, not included here)
        // await client.messages.create({ ... });

        res.status(200).json({ message: 'OTPs sent to phone and email.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/createinterview', async (req, res) => {
    const { jobTitle, jobDescription, experienceLevel, candidateEmail, endDate } = req.body;
  
    try {
      // Save job form data to the database
      const newJob = new Job({
        jobTitle,
        jobDescription,
        experienceLevel,
        candidateEmail,
        endDate
      });
      await newJob.save();
  
      // Email configuration
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidateEmail,
        subject: 'Interview Invitation for the Position of ' + jobTitle,
        text: `
          Dear Candidate,
  
          We are pleased to inform you that you have been shortlisted for the interview for the position of ${jobTitle}.
  
          Here are the details:
          - **Job Title**: ${jobTitle}
          - **Experience Level**: ${experienceLevel}
          - **Job Description**: ${jobDescription}
          - **Interview Date**: ${new Date(endDate).toLocaleDateString()}
  
          Please confirm your availability for the interview by replying to this email.
  
          We look forward to meeting you!
  
          Best regards,
          Hiring Team
        `,
      };
  
      // Send confirmation email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          return res.status(500).json({ message: 'Failed to send email' });
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      // Respond with success message
      res.status(201).json({ message: 'Job created and interview email sent successfully' });
    } catch (error) {
      console.log('Error saving job or sending email:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
// Verify Email OTP
router.post('/verify-email', [
    body('email').isEmail(),
    body('emailOTP').isLength({ min: 6, max: 6 })
], async (req, res) => {
    const { email, emailOTP } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check Email OTP
        console.log(emailOTP, user.emailOTP);
        if (user.emailOTP !== emailOTP) {
            return res.status(400).json({ message: 'Invalid email OTP' });
        }

        // Email OTP is valid, mark email as verified
        user.emailVerified = true;
        user.emailOTP = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Firebase phone verification
router.post('/verify-phone', [
    body('phone').isLength({ min: 10 }),
    body('verificationCode').isLength({ min: 6, max: 6 })
], async (req, res) => {
    const { phone, verificationCode } = req.body;

    try {
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone);
        const result = await confirmationResult.confirm(verificationCode);

        if (result.user) {
            return res.status(200).json({ message: 'Phone verified successfully.' });
        } else {
            return res.status(400).json({ message: 'Invalid verification code.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error verifying phone.' });
    }
});

// Login user
router.post('/login', [
    body('email').isEmail(),
    body('phone').isLength({ min: 10 })
], async (req, res) => {
    const { email, phone } = req.body;

    try {
        let user = await User.findOne({ email, phone });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(400).json({ message: 'Account not activated' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
