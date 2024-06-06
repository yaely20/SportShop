import React from 'react';
import './about.scss';
import logo from './images/logo2.png';

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our sports shop! We are passionate about sports and dedicated to providing you with the best quality sports equipment and apparel. Whether you are a professional athlete or a sports enthusiast, we have everything you need to excel in your favorite sport.
        </p>
        <p>
          Our mission is to offer a wide range of products at competitive prices, backed by exceptional customer service. We believe in the power of sports to bring people together, promote health, and create unforgettable experiences. Thank you for choosing our shop as your go-to destination for all your sporting needs.
        </p>
        <div className="logo-container">
          <img src={logo} alt="logo" className="about-logo" />
        </div>
      </div>
    </div>
  );
}

export default About;
