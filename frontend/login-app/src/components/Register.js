import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState(1); // Step 1: Registration form, Step 2: OTP verification
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      if (response.data.success) {
        setStep(2); // Move to OTP verification step
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      alert('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      if (response.data.success) {
        // OTP verified, proceed with registration
        await axios.post('http://localhost:5000/api/auth/register', { username, password, email });
        alert('User registered successfully');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (err) {
      alert('Error verifying OTP. Please try again.');
    }
  };

  const renderRegistrationForm = () => (
    <form onSubmit={handleRegister}>
      <input
        className="ip"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="ip"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="ip"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className='sign_button' type="submit">Next</button>
    </form>
  );

  const renderOTPVerificationForm = () => (
    <form onSubmit={handleVerifyOTP}>
      <input
        className="ip"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        required
      />
      <button type="submit">Verify OTP</button>
    </form>
  );

  return (<div className='Abhinav'>
    <div className="register-container">
      <h1 className="title">Gauri Vrindavan</h1>
      <div className="container">
        <h2>{step === 1 ? 'Signup' : 'Verify OTP'}</h2>
        {step === 1 ? renderRegistrationForm() : renderOTPVerificationForm()}
        {step === 1 ? (
          <div className="message">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        ) : null}
      </div>
    </div>
    </div>
  );
}

export default Register;
