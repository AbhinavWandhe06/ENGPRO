import React from 'react';
import Card from './evsOtherServ'; // Assuming Card component is correctly imported
import './otherServ.css';

const OtherServ = () => {
  return (
    <div className="event-management-wrapper">
      <div class="event-management-title-container">
        <span class="line"></span>
        <h1 class="event-management-title">Other Services</h1>
        <span class="line"></span>
      </div>

      <div className="event-management-container">
        <Card
          title="Car Washing"
          description="Professional car washing services using eco-friendly products and techniques."
        />
        <Card
          title="Spa"
          description="Relaxing spa treatments designed to rejuvenate your body and mind."
        />
        <Card
          title="Beauty (Make Ups)"
          description="Expert makeup services for special events and everyday glam."
        />
        <Card
          title="Nail Stylis"
          description="Creative and trendy nail styling services for all occasions."
        />
      </div>
    </div>
  );
};

export default OtherServ;
