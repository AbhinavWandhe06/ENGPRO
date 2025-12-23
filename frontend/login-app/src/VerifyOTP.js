import React, { useState } from 'react';
import axios from 'axios';

function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`, { email, otp });
      if (response.data.success) {
        alert('OTP verified successfully!');
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
}

export default VerifyOTP;