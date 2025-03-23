import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AddAmenitiesForm from './components/HotelAdmin/AddAmenitiesForm';
import AddHotelRules from './components/HotelAdmin/AddHotelRules';
import HotelDetail from './components/HotelAdmin/HotelDetail';
import Amenities from './components/HotelAdmin/Amenities';
import HotelRulesDetail from './components/HotelAdmin/HotelRulesDetail';
import Profile from './components/HotelAdmin/Profile';
import Review from './components/HotelAdmin/Review';
import AvailableRooms from './components/HotelAdmin/AvailableRooms';
import UnavailabilityManagement from './components/HotelAdmin/UnavailabilityManagement';
import AddDetailedRoomAndAmenities from './components/HotelAdmin/AddDetailedRoomAndAmenities';
import AddRoomForm from './components/HotelAdmin/AddRoomForm';

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
import HotelAdmin  from './components/SystemAdmin/HotelAdmin';

import HomePage from './components/HomePage';
import './App.css';

const App = () => {
  const [userRole, setUserRole] = useState(null); // null means user is not logged in
  const [userEmail, setUserEmail] = useState(''); // Store the logged-in user's email
  const [userName, setUserName] = useState(''); // Store the logged-in user's name
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapse

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', backgroundColor: '#393E46' }}>
        <CssBaseline />
        {/* Pass userName, collapsed, and toggleSidebar to Navbar */}
        <Navbar
          userRole={userRole}
          userEmail={userEmail}
          userName={userName}
          setUserRole={setUserRole}
          collapsed={collapsed}
          onToggleSidebar={toggleSidebar}
        />
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
            element={userRole === 'system-admin' ? <SystemAdminDashboard collapsed={collapsed} /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboards />} /> {/* Default route */}
            <Route path="user-management" element={<UserManagement />} />
            <Route path="hotel-management" element={<HotelManagement />} />
            <Route path="approve-hotel-admin" element={<ApproveHotelAdmin />} />
            <Route path="hotel-admin" element={<HotelAdmin />} />
            <Route path="booking-management" element={<BookingManagements />} />
            <Route path="payment-monitoring" element={<PaymentMonitoring />} />
            <Route path="checkbooking" element={<CheckBooking />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>

          {/* Hotel Admin Routes */}
          <Route
            path="/hotel-admin-dashboard"
            element={userRole === 'hotel-admin' ? <HotelAdminDashboard collapsed={collapsed} /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} /> {/* Default route */}
            <Route path="hotel-profile" element={<ProfileManagement />} />
            {/* <Route path="rooms" element={<RoomManagement />} /> */}
            <Route path="rooms" element={<AddRoomForm />} />
            <Route path="room-amenties" element={<AddDetailedRoomAndAmenities />} />
            <Route path="amenties" element={<AddAmenitiesForm />} />
            <Route path="hotel-rules" element={<AddHotelRules />} />
            <Route path="hotel-anavailability" element={<UnavailabilityManagement />} />
            <Route path="hotel-details" element={<HotelDetail />} />
            <Route path="amenties-detail" element={<Amenities />} />
            <Route path="hotel-rule-detail" element={<HotelRulesDetail />} />
            <Route path="hotel-room" element={<AvailableRooms />} />
            <Route path="hotel-review" element={<Review />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="check-booking" element={<CheckBooking />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
};

export default App;