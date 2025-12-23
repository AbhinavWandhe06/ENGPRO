// Card.js
import React, { useRef } from 'react';
import './card.css'; // Import the CSS file for styling

const Card = ({ title, copy, button, imageUrl, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercentage = (x / width) * 100;
    const yPercentage = (y / height) * 100;

    const rotateX = ((yPercentage - 50) / 50) * 20; // Adjust tilt range
    const rotateY = ((xPercentage - 50) / 50) * -20; // Adjust tilt range

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${imageUrl})` }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <h2 className="title">{title}</h2>
      <div className="content">
        <p className="copy">{copy}</p>
        <button className="btn">{button}</button>
      </div>
    </div>
  );
};

export default Card;
