import React from 'react';
import Rules from './Rules';
import HotelFAQs from './HotelsFAQ';

function HouseRules({ hotelAdminId }) {
  return (
    <>
      <Rules hotelAdminId={hotelAdminId} />
      <HotelFAQs />
    </>
  );
}

HouseRules.defaultProps = {
  hotelAdminId: null, // Default to null if not provided
};

export default HouseRules;