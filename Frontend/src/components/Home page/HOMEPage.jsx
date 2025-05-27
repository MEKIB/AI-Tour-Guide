import React from 'react';
import Home from './Home';
import HomeCarousel from './Carousel/HomeCarousel';

function HOMEPage({ location }) {
  return (
    <>
      <HomeCarousel />
      <Home userLocation={location} />
    </>
  );
}

export default HOMEPage;