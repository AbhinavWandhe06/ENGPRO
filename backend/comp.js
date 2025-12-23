const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
}));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'engapp',
    password: 'Pass@123',
    port: 5433,
});

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// OTP handling
let otpStore = {};

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

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp;

    sendOTPEmail(email, otp);
  
    res.status(200).json({ success: true, message: 'OTP sent to email' });
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] === otp) {
        delete otpStore[email];
        return res.status(200).json({ success: true, message: 'OTP verified' });
    }
    res.status(400).json({ success: false, message: 'Invalid OTP' });
});

// User registration and login
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(String(password), 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err.message);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

app.post('/logout', (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

app.get('/validate-token', (req, res) => {
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

// Appointment handling
app.post('/save-appointment', async (req, res) => {
    const { name, email, phone, date, time, service, subService, message } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO appointments (name, email, phone, date, time, service, sub_service, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, email, phone, date, time, service, subService, message, 'pending']
        );
        const savedAppointment = result.rows[0];
        client.release();

        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Appointment Confirmation',
            text: `Dear ${name},\n\nYour appointment for ${service} on ${date} at ${time} has been booked.\n\nThank you!\n\nBest regards,\nYour Company Name`
        };

        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'abhinavwandhe01@gmail.com',
            subject: 'New Appointment Booking',
            text: `Dear Owner,\n\nA new appointment has been booked:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nService: ${service}\nSub Service: ${subService}\nMessage: ${message}\n\nBest regards,\nYour Company Name`
        };

        transporter.sendMail(customerMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Failed to send email to customer');
            } else {
                console.log('Email sent to customer: ' + info.response);
                transporter.sendMail(ownerMailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send('Failed to send email to owner');
                    } else {
                        console.log('Email sent to owner: ' + info.response);
                        res.status(200).send('Appointment saved and emails sent successfully');
                    }
                });
            }
        });
    } catch (err) {
        console.error('Failed to save appointment:', err);
        res.status(500).send('Failed to save appointment');
    }
});

app.get('/appointments', async (req, res) => {
    const { status } = req.query;
    try {
        const client = await pool.connect();
        const query = status ? 'SELECT * FROM appointments WHERE status = $1 ORDER BY date ASC' : 'SELECT * FROM appointments ORDER BY date ASC';
        const result = await client.query(query, status ? [status] : []);
        const appointments = result.rows;
        client.release();
        res.status(200).json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});

app.put('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        const updatedAppointment = result.rows[0];
        client.release();
        res.status(200).json(updatedAppointment);
    } catch (err) {
        console.error(`Error updating appointment ${id} status:`, err);
        res.status(500).json({ error: `Error updating appointment ${id} status` });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
