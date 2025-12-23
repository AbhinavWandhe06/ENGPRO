import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/EngHome';
import SliderComponent from './components/slider';
import Register from './components/Register';
import Login from './login/Login';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sld" element={<SliderComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AdmPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
