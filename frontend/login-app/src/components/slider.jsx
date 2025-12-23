import React, { useState, useEffect } from 'react';
import './slider.css'; // Your CSS file for styling
import { TypeAnimation } from 'react-type-animation';
import img1 from '../assets/ConsultWP.jpg';
import img2 from '../assets/construction.jpg';
import img3 from '../assets/elect1.jpg';
import img4 from '../assets/Event_management.jpg';

const images = [
  {
    id: 1,
    src: img1,
    text1: "Engineering Consultancy Services",
    text2: "We specialize in providing comprehensive engineering solutions.",
  },
  {
    id: 2,
    src: img2,
    text1: "Civil Construction Services",
    text2: "Building strong foundations for a better future.",
  },
  {
    id: 3,
    src: img3,
    text1: "Electrical Work Services",
    text2: "Powering innovation with reliable electrical solutions.",
  },
  {
    id: 4,
    src: img4,
    text1: "Event Management",
    text2: "Creating memorable experiences through meticulous planning and execution.",
  },
];

const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <div className="overlay"></div> {/* Semi-transparent overlay */}
          <div className="text-overlay">
            {index === currentSlide && ( 
              <>
                <div className="text1-container">
                <TypeAnimation
                sequence={[image.text1]}
                speed={50}
                     style={{ fontWeight: 'bold', fontSize: '2em', color: 'black', fontFamily: 'Arial, sans-serif' }}
                     repeat={0}
                  
                  />
                </div>
                <div className="text2-container">
                  <TypeAnimation
                    sequence={[image.text2]}
                    speed={50}
                    style={{ fontSize: '1.5em', color: 'white', fontFamily: 'Times New Roman, serif', marginTop: '10px' }}
                    repeat={0}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <button className="prev" onClick={handlePrev}>&#10094;</button>
      <button className="next" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default SliderComponent;
