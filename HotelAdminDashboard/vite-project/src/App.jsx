import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/HotelAdmin/Dashboard';
import ProfileManagement from './components/HotelAdmin/ProfileManagement';
import RoomManagement from './components/HotelAdmin/RoomManagement';
import BookingManagement from './components/HotelAdmin/BookingManagement';
import CheckBooking from './components/HotelAdmin/CheckBooking';
import './App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      {/* Navbar */}
      <Navbar />

      {/* Main container */}
      <Box className="main-container">
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <Box className="content">
          <Routes>
            {/* Dashboard */}
            <Route path="/hotel-admin" element={<Dashboard />} />

            {/* Profile Management */}
            <Route path="/hotel-admin/profile" element={<ProfileManagement />} />

            {/* Room Management */}
            <Route path="/hotel-admin/rooms" element={<RoomManagement />} />

            {/* Booking Management */}
            <Route path="/hotel-admin/bookings" element={<BookingManagement />} />

            {/* Check Booking */}
            <Route path="/hotel-admin/check-booking" element={<CheckBooking />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;