import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cart from './cart';
import Login from './Login';

const NewApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default NewApp;