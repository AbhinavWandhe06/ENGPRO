import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css'; // Importing a CSS file for styling
import logo from '../assets/logo.png';
const AdminPage = () => {
  const navigate = useNavigate();
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);

  useEffect(() => {
    fetchAppointmentsByStatus('pending', setPendingAppointments);
    fetchAppointmentsByStatus('approved', setApprovedAppointments);
    fetchAppointmentsByStatus('rejected', setRejectedAppointments);
  }, []);

  const fetchAppointmentsByStatus = async (status, setAppointments) => {
    try {
      const response = await axios.get(`http://localhost:3001/appointments?status=${status}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3001/appointments/${id}`, { status: newStatus });
      const updatedAppointment = response.data;

      setPendingAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
      setApprovedAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
      setRejectedAppointments((prev) => prev.filter((appointment) => appointment.id !== id));

      if (newStatus === 'approved') {
        setApprovedAppointments((prev) => [...prev, updatedAppointment]);
      } else if (newStatus === 'rejected') {
        setRejectedAppointments((prev) => [...prev, updatedAppointment]);
      } else {
        setPendingAppointments((prev) => [...prev, updatedAppointment]);
      }
    } catch (error) {
      console.error(`Error updating status for appointment ${id}:`, error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      localStorage.removeItem('token');
      
      navigate('/login');
    } catch (err) {
      alert('Error logging out');
    }
  };

  const renderTable = (appointments, status) => (
    <table className="appointment-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Time</th>
          <th>Service</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => (
          <tr key={appointment.id}>
            <td>{appointment.name}</td>
            <td>{appointment.email}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.service}</td>
            <td>{appointment.status}</td>
            <td>
              {status === 'pending' && (
                <>
                  <button onClick={() => handleUpdateStatus(appointment.id, 'approved')}>Approve</button>
                  <button onClick={() => handleUpdateStatus(appointment.id, 'rejected')}>Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="admin-page">
        <header  className="home-header">
        <div className="header-content">
          <img src={logo} alt="Any Construction Logo" className="logo" />
          
          <button className='logout-button' onClick={handleLogout}>Logout</button>
         
        </div>
      </header>
      <h2>Admin Dashboard</h2>
      <div className="tables-container">
        <div className="table-section">
          <h3>Pending Appointments</h3>
          {renderTable(pendingAppointments, 'pending')}
        </div>
        <div className="table-section">
          <h3>Approved Appointments</h3>
          {renderTable(approvedAppointments, 'approved')}
        </div>
        <div className="table-section">
          <h3>Rejected Appointments</h3>
          {renderTable(rejectedAppointments, 'rejected')}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
