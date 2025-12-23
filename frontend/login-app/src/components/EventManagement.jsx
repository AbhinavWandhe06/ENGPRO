import React from 'react';
import Card from './Card2'; // Import the updated Card component
import './evs.css'; // Import the CSS file for styling

const EventManagement = () => {
  return (
<div className="event-management-wrapper">
<div class="event-management-title-container">
        <span class="line"></span>
        <h1 class="event-management-title">Event Management</h1>
        <span class="line"></span>
      </div>


    <div className="event-management-container">
      <Card
        title="All Type of Party Arrangement"
        description="Creating detailed event plans to ensure a seamless experience."
      />
      <Card
        title="Birthday Event"
        description="Providing beautiful and innovative event decoration solutions."
      />
      <Card
        title="Weddings"
        description="Managing vendors and suppliers to deliver exceptional event services."
      />
      <Card
        title="Cocktail"
        description="Overseeing event logistics and operations for flawless execution."
      />
      <Card
        title="Sport Event"
        description="Providing beautiful and innovative event decoration solutions."
      />
      <Card
        title="Corporate Event"
        description="Managing vendors and suppliers to deliver exceptional event services."
      />
      <Card
        title="House Warming Event"
        description="Overseeing event logistics and operations for flawless execution."
      />
      <Card
        title="Launching Event"
        description="Overseeing event logistics and operations for flawless execution."
      />

    </div>
    </div>
  );
};

export default EventManagement;
