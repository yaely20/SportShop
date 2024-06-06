// src/Home.js

import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './home.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';

const Home = ({allProduct}) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  };

  return (
    <div className="home">
      <Slider {...settings}>
        <div>
          <img src={image1} alt="Slide 1" className="full-screen-image" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" className="full-screen-image" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" className="full-screen-image" />
        </div>
        <div>
          <img src={image4} alt="Slide 4" className="full-screen-image" />
        </div>
        <div>
          <img src={image5} alt="Slide 5" className="full-screen-image" />
        </div>
      </Slider>
      <button className="explore-button" onClick={allProduct}>
        Explore More
      </button>
    </div>
  );
};

export default Home;
