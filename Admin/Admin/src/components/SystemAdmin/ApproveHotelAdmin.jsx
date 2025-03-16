import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import image from "../../assets/13.jpg";

const ApproveHotelAdmin = () => {
  const [pendingHotelAdmins, setPendingHotelAdmins] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image
  const [open, setOpen] = useState(false); // State to control the modal

  // Fetch pending Hotel Admins from the backend (mock data for now)
  useEffect(() => {
    const mockPendingHotelAdmins = [
      {
        id: 1,
        name: 'Hotel Admin A',
        passportImage: image, // Placeholder image URL
        location: 'Addis Ababa, Ethiopia',
        phoneNumber: '+251 912 345 678',
        email: 'hoteladminA@example.com',
        tradeLicenseImage: image, // Placeholder image URL
        managerIdImage: image, // Placeholder image URL
      },
      {
        id: 2,
        name: 'Hotel Admin B',
        passportImage: 'https://via.placeholder.com/100', // Placeholder image URL
        location: 'Hawassa, Ethiopia',
        phoneNumber: '+251 987 654 321',
        email: 'hoteladminB@example.com',
        tradeLicenseImage: 'https://via.placeholder.com/100', // Placeholder image URL
        managerIdImage: 'https://via.placeholder.com/100', // Placeholder image URL
      },
    ];
    setPendingHotelAdmins(mockPendingHotelAdmins);
  }, []);

  // Approve a Hotel Admin
  const approveHotelAdmin = (userId) => {
    setPendingHotelAdmins((prevAdmins) =>
      prevAdmins.filter((admin) => admin.id !== userId)
    );
    alert(`Hotel Admin ${userId} approved.`);
  };

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the selected image
    setOpen(true); // Open the modal
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#222831', // Dark background
        color: '#EEEEEE', // Light text
        minHeight: '100vh',
        p: 4,
      }}
    >
      {/* Link to External Website */}
      <Button
        variant="contained"
        onClick={() => window.open('https://etrade.gov.et/business-license-checker', '_blank')}
        sx={{
          backgroundColor: '#00ADB5', // Accent color
          color: '#EEEEEE', // Light text
          '&:hover': {
            backgroundColor: '#0097A7', // Darker accent color on hover
          },
          mb: 4, // Add margin at the bottom
        }}
      >
        Open Business License Checker
      </Button>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#00ADB5', // Accent color
          textAlign: 'center',
        }}
      >
        Approve Hotel Admin Accounts
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#393E46', // Table background
          color: '#EEEEEE', // Table text
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Passport/ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Trade License</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Manager ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingHotelAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.id}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.name}</TableCell>
                <TableCell>
                  <Avatar
                    src={admin.passportImage}
                    alt="Passport/ID"
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    onClick={() => handleImageClick(admin.passportImage)}
                  />
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.location}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.phoneNumber}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.email}</TableCell>
                <TableCell>
                  <Avatar
                    src={admin.tradeLicenseImage}
                    alt="Trade License"
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    onClick={() => handleImageClick(admin.tradeLicenseImage)}
                  />
                </TableCell>
                <TableCell>
                  <Avatar
                    src={admin.managerIdImage}
                    alt="Manager ID"
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    onClick={() => handleImageClick(admin.managerIdImage)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => approveHotelAdmin(admin.id)}
                    sx={{
                      backgroundColor: '#00ADB5', // Accent color
                      color: '#EEEEEE', // Light text
                      '&:hover': {
                        backgroundColor: '#0097A7', // Darker accent color on hover
                      },
                    }}
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for displaying the enlarged image */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#222831',
            p: 3, // Add padding to the modal content
            overflow: 'auto', // Enable scrolling
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={selectedImage}
              alt="Enlarged"
              style={{
                width: '100%', // Make the image fill the modal width
                height: 'auto', // Allow the image to scale naturally
                maxWidth: 'none', // Remove width constraint
                maxHeight: 'none', // Remove height constraint
                borderRadius: '8px',
              }}
            />
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute', // Position relative to the parent container
                top: 8,
                right: 8,
                color: '#EEEEEE',
                backgroundColor: '#00ADB5',
                '&:hover': {
                  backgroundColor: '#0097A7',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ApproveHotelAdmin;