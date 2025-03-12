import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';

// Hotel admin components
import HotelAdminDashboard from './components/HotelAdmin/HotelAdminDashboard';
import Dashboard from './components/HotelAdmin/Dashboard';
import ProfileManagement from './components/HotelAdmin/ProfileManagement';
import RoomManagement from './components/HotelAdmin/RoomManagement';
import BookingManagement from './components/HotelAdmin/BookingManagement';
import CheckBooking from './components/HotelAdmin/CheckBooking';

// System admin components
import SystemAdminDashboard from './components/SystemAdmin/SystemAdminDashboard';
import Dashboards from './components/SystemAdmin/Dashboard';
import UserManagement from './components/SystemAdmin/UserManagement';
import HotelManagement from './components/SystemAdmin/HotelManagement';
import ApproveHotelAdmin from './components/SystemAdmin/ApproveHotelAdmin';
import BookingManagements from './components/SystemAdmin/BookingManagement';
import PaymentMonitoring from './components/SystemAdmin/PaymentMonitoring';
import SystemSettings from './components/SystemAdmin/SystemSettings';
import ProfileSettings from './components/SystemAdmin/ProfileSettings';

import HomePage from './components/HomePage';
import './App.css';

const App = () => {
  const [userRole, setUserRole] = useState(null); // null means user is not logged in
  const [userEmail, setUserEmail] = useState(''); // Store the logged-in user's email
  const [userName, setUserName] = useState(''); // Store the logged-in user's name

  return (
    <Router>
      <Box sx={{ display: 'flex', backgroundColor:'#393E46', }}>
        <CssBaseline />
        {/* Pass userName to Navbar */}
        <Navbar userRole={userRole} userEmail={userEmail} userName={userName} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Pass setUserName to Login */}
          <Route
            path="/login"
            element={
              <Login
                setUserRole={setUserRole}
                setUserEmail={setUserEmail}
                setUserName={setUserName}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />

          {/* System Admin Routes */}
          <Route
            path="/system-admin-dashboard"
            element={userRole === 'system-admin' ? <SystemAdminDashboard /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboards />} /> {/* Default route */}
            <Route path="user-management" element={<UserManagement />} />
            <Route path="hotel-management" element={<HotelManagement />} />
            <Route path="approve-hotel-admin" element={<ApproveHotelAdmin />} />
            <Route path="booking-management" element={<BookingManagements />} />
            <Route path="payment-monitoring" element={<PaymentMonitoring />} />
            <Route path="checkbooking" element={<CheckBooking />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>

          {/* Hotel Admin Routes */}
          <Route
            path="/hotel-admin-dashboard"
            element={userRole === 'hotel-admin' ? <HotelAdminDashboard /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} /> {/* Default route */}
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="rooms" element={<RoomManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="check-booking" element={<CheckBooking />} />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
};

export default App;