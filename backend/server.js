const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db'); // 👈 USE db.js

const app = express();
const port = process.env.PORT || 3001;

/* =====================
   MIDDLEWARE
===================== */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://your-site-name.netlify.app' // change after Netlify deploy
    ],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
  })
);

/* =====================
   NODEMAILER
===================== */
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =====================
   SAVE APPOINTMENT
===================== */
app.post('/save-appointment', async (req, res) => {
  const { name, email, phone, date, time, service, subService, message } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO appointments
      (name, email, phone, date, time, service, sub_service, message, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [name, email, phone, date, time, service, subService, message, 'pending']
    );

    /* ---- Mail to customer ---- */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Dear ${name},

Your appointment for ${service} on ${date} at ${time} has been booked.

Thank you!
`,
    });

    /* ---- Mail to owner ---- */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'abhinavwandhe01@gmail.com',
      subject: 'New Appointment Booking',
      text: `New Appointment Details:

Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Service: ${service}
Sub Service: ${subService}
Message: ${message}
`,
    });

    res.status(200).json({
      message: 'Appointment saved and emails sent successfully',
      appointment: result.rows[0],
    });
  } catch (err) {
    console.error('Error saving appointment:', err);
    res.status(500).json({ error: 'Failed to save appointment' });
  }
});

/* =====================
   GET APPOINTMENTS
===================== */
app.get('/appointments', async (req, res) => {
  const { status } = req.query;

  try {
    const query = status
      ? 'SELECT * FROM appointments WHERE status = $1 ORDER BY date ASC'
      : 'SELECT * FROM appointments ORDER BY date ASC';

    const result = await pool.query(query, status ? [status] : []);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

/* =====================
   UPDATE STATUS
===================== */
app.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

/* =====================
   START SERVER
===================== */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
