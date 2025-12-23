import React, { useState } from 'react';
import './evsElec.css'; // Import the CSS file for styling

const Card = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="custom-card-elec"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className={`custom-content ${isHovered ? 'hovered' : ''}`}>
        <h3 className="custom-title">{title}</h3>
        <p className={`custom-description ${isHovered ? 'visible' : ''}`}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
