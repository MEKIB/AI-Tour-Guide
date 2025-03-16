import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // For nested routes
import SideBar from './SideBar'; // Ensure the import path is correct

const SystemAdminDashboard = ({ collapsed }) => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#222831', minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar collapsed={collapsed} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#393E46', // Dark background
          color: '#EEEEEE', // Light text
          marginLeft: collapsed ? '10px' : '20px', // Adjust for the SideBar width
          marginTop: '64px', // Adjust for the Navbar height
          transition: 'margin-left 0.3s ease', // Smooth transition for margin
          paddingLeft: collapsed ? '80px' : '120px', 
        }}
      >
        <Outlet /> {/* Render nested routes here */}
      </Box>
    </Box>
  );
};

export default SystemAdminDashboard;