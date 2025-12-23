import React from 'react';
import Card from './evsElec'; // Assuming Card component is correctly imported
import './evsElec.css';

const ElectricalWork = () => {
  return (
    <div className="event-management-wrapper">
      <div class="event-management-title-container">
        <span class="line"></span>
        <h1 class="event-management-title">Electrical Work Services</h1>
        <span class="line"></span>
      </div>
      <div className="event-management-container">
        <Card
          title="Basic Electric Fitting"
          description="Professional installation of basic electrical fittings, ensuring safety and functionality in residential and commercial spaces."
        />
        <Card
          title="Smart Switches Fitting"
          description="Installation of smart switches for enhanced convenience and energy efficiency in modern living spaces."
        />
        <Card
          title="Smart Door Lock"
          description="Installation of smart door locks with advanced security features, offering convenience and peace of mind."
        />
        <Card
          title="Automation Work"
          description="Implementation of automation solutions to streamline operations and enhance efficiency in homes and businesses."
        />
      </div>
    </div>
  );
};

export default ElectricalWork;
