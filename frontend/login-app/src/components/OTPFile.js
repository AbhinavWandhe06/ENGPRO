import React, { useState } from 'react';
import axios from 'axios';

const OTPForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/send-otp', { email });
      console.log('OTP sent:', response.data);
      // Optionally show success message
    } catch (error) {
      console.error('Error sending OTP:', error.response.data.error);
      // Handle error, show error message, etc.
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify-otp', { email, otp });
      console.log('OTP verified:', response.data);
      // Optionally redirect or show success message
    } catch (error) {
      console.error('Error verifying OTP:', error.response.data.error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSendOTP}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send OTP</button>
      </form>
      <form onSubmit={handleVerifyOTP}>
        <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOTP(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPForm;
