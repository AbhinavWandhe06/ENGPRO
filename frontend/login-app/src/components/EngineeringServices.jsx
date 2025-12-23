import React from 'react';
import Card from './evsConsultServ'; // Assuming Card component is correctly imported
import './evsConsServ.css';

const EngineeringServices = () => {
  return (
    <div className="event-management-wrapper">
      <div class="event-management-title-container">
        <span class="line"></span>
        <h1 class="event-management-title">Engineering Consultancy Services</h1>
        <span class="line"></span>
      </div>

      <div className="event-management-container">
        <Card
          title="Architectural Drawing Sanctioning"
          description="We provide comprehensive architectural drawing services, ensuring compliance with local regulations and standards."
        />
        <Card
          title="Building Planning and Designing"
          description="Our expert team offers detailed building planning and designing services tailored to your project requirements."
        />
        <Card
          title="Estimation of Building"
          description="Accurate estimation services to help you budget effectively for your building projects."
        />
        <Card
          title="Valuation of Building/ Plot/ Property"
          description="Professional valuation services for buildings, plots, and properties, providing accurate market assessments."
        />
        <Card
          title="Layout Drawing/ Column Positioning"
          description="Precise layout drawings and column positioning plans to optimize space and structural integrity."
        />
        <Card
          title="Appointment for Engineering Services"
          description="Schedule appointments with our engineering team to discuss your specific project needs and requirements."
        />
        <Card
          title="Building Assistance"
          description="Comprehensive building assistance services, ensuring smooth project execution and compliance with regulations."
        />
      </div>
    </div>
  );
};

export default EngineeringServices;
