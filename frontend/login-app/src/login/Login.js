import React, { useState } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';
import styles from './Login.css'; // Import CSS modules
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from '../assets/bgLogin1.jpg';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation
  
  const styles = {
    Abhinav: {
      fontFamily: "Tajawal, sans-serif",
      backgroundColor: "#f7f7f7",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      
      navigate('/AdmPage'); // Navigate to home page upon successful login
    } catch (err) {
      alert('Invalid credentials');
    }
  };
  return (
    <div className='Abhinav' style={styles.Abhinav}>
  <img src={logo} alt="Any Construction Logo" className="logo1" />
  <div className="login-container"> 
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='login_button' type="submit">Login</button>
      </form>
      {/* <div className="message">
        <p>Don't have an account? <a href="/AdmPage">Signup</a></p>
      </div> */}
    </div>
  </div>
</div>
  );
}

export default Login;
