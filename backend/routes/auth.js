const express = require('express');
const cors = require('cors'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const pool = require('../db');
require('dotenv').config();
const router = express.Router();
let otpStore = {};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
router.use(cors());

const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

router.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = otp;

  sendOTPEmail(email, otp);
  
  res.status(200).json({ success: true, message: 'OTP sent to email' });
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.status(200).json({ success: true, message: 'OTP verified' });
  }
  res.status(400).json({ success: false, message: 'Invalid OTP' });
});

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  console.log('Received registration request:', { username, email }); // For debugging

  // Hash the password
  const hashedPassword = await bcrypt.hash(String(password), 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );

    console.log('User registered:', result.rows[0]); // For debugging

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error registering user:', err.message); // Log the error
    res.status(500).json({ error: 'Error registering user' }); // Return a generic error message
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout endpoint (clear the token on the client side)
router.post('/logout', (req, res) => {
  // On the client side, remove the token from local storage or cookies
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});


router.get('/validate-token', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
