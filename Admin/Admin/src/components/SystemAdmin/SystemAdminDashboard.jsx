import React from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom'; // For nested routes
import SideBar from './SideBar'; // Ensure the import path is correct

const SystemAdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#222831', minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#393E46', // Dark background
          color: '#EEEEEE', // Light text
          marginLeft: '20px', // Adjust for the SideBar width
          marginTop: '64px', // Adjust for the Navbar height
          paddingLeft:'120px',

        }}
      >
        
        <Outlet /> {/* Render nested routes here */}
      </Box>
    </Box>
  );
};

export default SystemAdminDashboard;