import React, { useState, useEffect } from 'react';
// import './HotelManagement.css';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);

  // Fetch hotels from the backend (mock data for now)
  useEffect(() => {
    const mockHotels = [
      { id: 1, name: 'Hotel A', location: 'New York', status: 'approved' },
      { id: 2, name: 'Hotel B', location: 'Los Angeles', status: 'pending' },
      { id: 3, name: 'Hotel C', location: 'Chicago', status: 'approved' },
    ];
    setHotels(mockHotels);
  }, []);

  // Approve a hotel
  const approveHotel = (hotelId) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === hotelId ? { ...hotel, status: 'approved' } : hotel
      )
    );
    alert(`Hotel ${hotelId} approved.`);
  };

  return (
    <div className="hotel-management">
      <h1>Hotel Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.status}</td>
              <td>
                {hotel.status === 'pending' && (
                  <button onClick={() => approveHotel(hotel.id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelManagement;