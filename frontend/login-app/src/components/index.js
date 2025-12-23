import React from 'react';
import { useNavigate } from 'react-router';
import './index.css'; 
import image1 from '../assets/menu_icon.png';
import axios from 'axios';
import image2 from '../assets/Loni1.jpg';
import { useState } from 'react';
import { useEffect } from 'react';

function toggleMenu() {
  const menuOptions = document.querySelector('.menu-options');
  menuOptions.classList.toggle('show-menu');
}

const Header = () => {
  const navigate = useNavigate();

  const toggleMenu = () => {
    const menuOptions = document.querySelector('.menu-options');
    if (menuOptions) {
      menuOptions.classList.toggle('show-menu');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      localStorage.removeItem('token');
      alert('Logout successful');
      navigate('/login'); // Navigate to login page after logout
    } catch (err) {
      alert('Error logging out');
    }
  };

  return (
    <>
      <header className="header">
        <div className="menu-icon" onClick={toggleMenu}>
          <img 
            style={{
              display: 'flex',
              height: '30px',
              width: '30px',
              marginTop: '1px'
            }} 
            src={image1} 
            alt="Menu" 
          />
        </div>
        <h1>Gauri Vrindavan</h1>
        <div className="login-signup">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <button className="signup-button">Signup</button>
        </div>
      </header>

      <nav className="menu-options">
        <a href="index.html">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#">Contact</a>
        <a href="/cart">Cart</a>
      </nav>
    </>
  );
};

function AboutUs() {
  return (
    <>
      <div className="banner"></div>
      <div className="content" id="about">
        <h2>About Us</h2>
        <p>We are Gauri Vrindavan, We are here to serve Delcious Delicacies to our guests. Our values is to provide our user mind Blowing test, that will help you experience heaven</p>
        <p>Our top dishes are Loni Dosa, Sponge Dosa, Masala Dosa, Uthsppam</p>
      </div>
    </>
  );
}


////////////////////////////////////////////////

const MenuItem = ({ name, price, image, description, addToCart, incrementCount, decrementCount }) => {
  
  return (
    <div className="menu-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="quantity-control">
        <button className="decrement-btn" onClick={() => decrementCount(name)}>-</button>
        <span className="item-count">1</span>
        <button className="increment-btn" onClick={() => incrementCount(name)}>+</button>
      </div>
      <button className="add-to-cart-btn" onClick={() => addToCart(name)}>Add to Cart</button>
    </div>
  );
};
//////////////////////////////////////////////////////////////////////////////

const Menu = () => {
  const menuItems = [
    { name: "Menu Item 1", price: 10, image: "path/to/image.jpg", description: "Description of Menu Item 1" },
    { name: "Menu Item 2", price: 20, image: "path/to/image.jpg", description: "Description of Menu Item 2" },
    // Add more items as needed
  ];

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1, total: item.price });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${item.name} to cart!`);
  };

  const incrementCount = (itemName) => {
    const itemIndex = menuItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      menuItems[itemIndex].count += 1;
    }
  };

  const decrementCount = (itemName) => {
    const itemIndex = menuItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1 && menuItems[itemIndex].count > 1) {
      menuItems[itemIndex].count -= 1;
    }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-heading">Menu</h2>
      <div className="menu">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
            addToCart={() => addToCart(item)}
            incrementCount={() => incrementCount(item.name)}
            decrementCount={() => decrementCount(item.name)}
          />
        ))}
      </div>
    </div>
  );
};


// -----------------------------------------------------------------------------------------------------

function Footer() {
  return (
    <footer className="footer">
      &copy; 2024 Gauri Vrindavan. All rights reserved.
    </footer>
  );
}
// 
function NewApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const validateToken = async () => {
      try {
        await axios.get('http://localhost:5000/api/auth/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    if (!token) {
      navigate('/login');
    } else {
      validateToken();
    }
  }, [navigate]);

 
  function Map123() {
    return (
      <>
        <iframe 
          style={{ 
            marginLeft: '15%', 
            borderImage: 'linear-gradient(to right, #f9d423, #ff4e50) 10 round'
          }} 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7443.391850428976!2d79.05755564773405!3d21.124685700000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bff3e717ad3f%3A0xf88e9f97140ae38b!2sGauri%20Vrindavan%20Restaurant!5e0!3m2!1sen!2sin!4v1712900761300!5m2!1sen!2sin" 
          width="70%" 
          height="450" 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </>
    );
  }
  return (
    <div className="App">
      <Header />
      <AboutUs />
      <Menu />
      <Map123 />
      <Footer />
    </div>
  );
}

export default NewApp;