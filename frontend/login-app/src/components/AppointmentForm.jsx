import React, { useState } from 'react';
import './AppointmentForm.css';
import axios from 'axios';

const services = {
    'Engineering Consultancy Services': [
      'Architectural Drawing Sanctioning',
      'Building Planning and Designing',
      'Estimation of Building',
      'Valuation of Building/ Plot/ Property',
      'Layout Drawing/ Column Positioning',
      'Appointment for Engineering Services',
      'Building Assistance'
    ],
    'Civil Construction Services': [
      'Any Type of Building Construction',
      'Any Type of Building Maintenance',
      'Wall Putty, Interior and Exterior Painting',
      'Plumbing Work',
      'Tile and Granite Work',
      'Waterproofing Work',
      'Pest Control',
      'Anti-Termite Treatment',
      'Modular Kitchen',
      'Furniture Work',
      'Carpentry Work'
    ],
    'Electrical Work Services': [
      'Basic Electric Fitting',
      'Smart Switches Fitting',
      'Smart Door Lock',
      'Automation Work'
    ],
    'Event Management': [
      'All Type of Party Arrangement',
      'Birthday Event',
      'Weddings',
      'Cocktail',
      'Sport Event',
      'Corporate Event',
      'House Warming Event',
      'Launching Event'
    ],
    'Other Services': [
      'Car Washing',
      'Spa',
      'Beauty (Make Ups)',
      'Nail Stylis'
    ]
  };

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        subService: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitted(false);
        try {
            const response = axios.post('http://localhost:5000/save-appointment', formData);

            console.log('Appointment saved:', response.data);
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                service: '',
                subService: '',
                message: '',
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to save appointment:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderSubServices = () => {
        if (formData.service && services[formData.service]) {
            return (
                <div className="form-group">
                    <label htmlFor="subService">Sub Service Required</label>
                    <select
                        id="subService"
                        name="subService"
                        value={formData.subService}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a sub service</option>
                        {services[formData.service].map((subService) => (
                            <option key={subService} value={subService}>{subService}</option>
                        ))}
                    </select>
                </div>
            );
        }
        return null;
    };

    const today = new Date().toISOString().split('T')[0];

    return   (
        <>
            <h2 className='headss'>Book an Appointment</h2>
            <div className="appointment-form-container">
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <form className="appointment-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>                             
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"                                                                                                                             
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Preferred Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={today}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Preferred Time</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service">Service Required</label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a service</option>
                                {Object.keys(services).map((service) => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </select>
                        </div>
                        {renderSubServices()}
                        <div className="form-group">
                            <label htmlFor="message">Additional Notes</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit">Book Appointment</button>
                        {submitted && <div className="success-message">Appointment booked successfully!</div>}
                    </form>
                )}
            </div>
        </>
    );
};

export default AppointmentForm;
