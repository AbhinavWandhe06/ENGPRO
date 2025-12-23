  import React, { useState, useEffect } from 'react';
  import './Home.css';
  import logo from '../assets/logo.png';
  import SliderComponent from './slider';
  import ElectricalWork from './ElectricalWork';
  import EngineeringServices from './EngineeringServices';
  import EventManagement from './EventManagement';
  import CivilConstruction from './CivilConstruction';
  import Card from './card';
  import img1 from '../assets/photo1.jpg';
  import img2 from '../assets/photo2.jpg';
  import img3 from '../assets/photo3.jpg';
  import img4 from '../assets/photo4.jpg';
  import menuIcon from '../assets/menu-icon.png';
  import closeIcon from '../assets/close-icon.png';
  import aboutImage from '../assets/aboutus.png';
  import img5 from '../assets/OtherServ.jpg';
  import OtherServ from './OtherServ';
  import AppointmentForm from './AppointmentForm';
  import { motion } from 'framer-motion';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  const cardContents = [
    <EngineeringServices key={0} />,
    <CivilConstruction key={1} />,
    <ElectricalWork key={2} />,
    <EventManagement key={3} />,
    <OtherServ key={4}/>
  ];

  const cards = [      
    { id: 0, title: 'Engineering Consultancy Services', copy: 'We specialize in providing comprehensive engineering solutions.', button: 'Explore More', imageUrl: img1 },
    { id: 1, title: 'Civil Construction Services', copy: 'Building strong foundations for a better future.', button: 'Explore More', imageUrl: img2 },
    { id: 2, title: 'Electrical Work Services', copy: 'Powering innovation with reliable electrical solutions.', button: 'Explore More', imageUrl: img3 },
    { id: 3, title: 'Event Management', copy: 'Creating memorable experiences through meticulous planning and execution.', button: 'Explore More', imageUrl: img4 },
    { id: 4, title: 'Other Services', copy: 'Providing other valuable services to help you live your life to the fullest.', button: 'Explore More', imageUrl: img5 }
  ];

  return (
    <div id='home' className="home-container">
      <header className="home-header">
        <div className="header-content">
          <img src={logo} alt="Any Construction Logo" className="logo" />
          <div className="menu-icon" onClick={toggleMenu}>
            <img src={menuIcon} alt="Menu" />
          </div>
        </div>
      </header>

      <div className={`menu-options ${menuOpen ? 'show-menu' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <img src={closeIcon} alt="Close" />
        </div>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Our Services</a>
        <a href="#apt_form">Appointment Form</a>
        <a href="#contact">Contact Us</a>
      </div>

      <SliderComponent />

      <nav className={`navigation ${visible ? 'visible' : 'hidden'}`}>
        <ul>
          <li className={activeTab === 0 ? 'active' : ''} onClick={() => setActiveTab(0)}>
            <a href="#">Home</a>
            {activeTab === 0 && <div className="underline"></div>}
          </li>
          <li className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>
            <a href="#about">About Us</a>
            {activeTab === 1 && <div className="underline"></div>}
          </li>
          <li className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>
            <a href="#services">Our Services</a>
            {activeTab === 2 && <div className="underline"></div>}
          </li>
          <li className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>
            <a href="#apt_form">Appointment for Work</a>
            {activeTab === 3 && <div className="underline"></div>}
          </li>
        </ul>
      </nav>

      <motion.section className="about" id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 2 }}
      >
        <div className="about-container">
          <motion.div className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 2 }}
          >
            <h2>About Us</h2>
            <p>Building Dreams. One brick at a Time. We specialize in public and private turnkey projects, homes, extensions, and interior. Our civil construction expertise ensures quality, innovation, and timely delivery for every project. Trust us to turn your vision into reality.</p>
            <p>Additionally, our engineering consultancy services offer expert guidance and support in the planning, design, and execution of various engineering projects. Whether it's civil, mechanical, electrical, or environmental engineering, we provide comprehensive solutions tailored to meet your project requirements.</p>
            <p>From designing sustainable structures to managing complex infrastructure projects, we combine creativity with technical expertise to deliver outstanding results.</p>
          </motion.div>
          <motion.div className='about-image'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 2 }}
          >
            <div className="about-image">
              <img src={aboutImage} alt="About Us Image" />
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      <h2 id="services"></h2> 
      <motion.section className="services" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 3 }}
      >
        <motion.h2 className='heads' 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          Our Services
        </motion.h2>
        <div className="card-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              copy={card.copy}
              button={card.button}
              imageUrl={card.imageUrl}
              onClick={() => handleCardClick(card.id)}
              isActive={selectedCard === card.id}
              />
            ))}
          </div>
          {selectedCard !== null && (
            <motion.div className="card-details"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 2 }}
            >
              {cardContents[selectedCard]}
            </motion.div>
          )}
        </motion.section>
  
        <motion.section className="appointment" id="apt_form"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 3 }}
        >
          <AppointmentForm />
        </motion.section>
  
        <footer id='contact' className="contact">
          <h2>Contact Us</h2>
          <p>Email: anyconstructions@gmail.com</p>
          <p>Phone: +91 7385204282</p>
          <p>Phone: +91 8668227395</p>
          <p>Phone: +918669171099</p>
          <p>Address: 123 Construction Lane, Buildtown, BT 45678</p>
        </footer>
      </div>
    );
  };
  
  export default Home;
