const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Pool } = require('pg');

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
    service: 'gmail',
    auth: {
        user: 'abhinavwandhe@gmail.com',
        pass: 'lkbd pzwr wrjf fdlc'
    }
});

// Endpoint to save appointment and send emails
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
            from: 'abhinavwandhe@gmail.com',
            to: email,
            subject: 'Appointment Confirmation',
            text: `Dear ${name},\n\nYour appointment for ${service} on ${date} at ${time} has been booked.\n\nThank you!\n\nBest regards,\nYour Company Name`
        };

        const ownerMailOptions = {
            from: 'abhinavwandhe@gmail.com',
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

// Endpoint to fetch all appointments
app.get('/appointments', async (req, res) => {
    const { status } = req.query; // Get the status from query parameters
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

// Endpoint to update appointment status (approve/reject)
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
