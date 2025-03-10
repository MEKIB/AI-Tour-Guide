import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.js';
import lalibela from '../../../assets/lalibela-1.jpg'
import laketana from '../../../assets/lake_tana.jpg'
import gonder from '../../../assets/Gondar-1.jpg'
const images = [
  lalibela,
  laketana,
  gonder
];



function HomeCarousel() {
  return (
    <Carousel arrows infinite={false}>
      {images.map((image, index) => (
        <div key={index}>
          <img 
            src={image} 
            alt={`Image ${index + 1}`} 
            style={{ width: '100%', height: '500px', objectFit: 'cover' }} 
            onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }} // Add a fallback image
          />
        </div>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
