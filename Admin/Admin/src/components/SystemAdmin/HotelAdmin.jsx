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
  DialogTitle,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import image from "../../assets/13.jpg";

const HotelAdmin = () => {
  const [hotelAdmins, setHotelAdmins] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [adminToRemove, setAdminToRemove] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const adminsPerPage = 10; // Number of admins to display per page

  // Mock data for hotel admins
  useEffect(() => {
    const mockHotelAdmins = [
      // Add more than 10 admins to test pagination
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Hotel Admin ${i + 1}`,
        passportImage: image,
        location: 'Addis Ababa, Ethiopia',
        phoneNumber: '+251 912 345 678',
        email: `hoteladmin${i + 1}@example.com`,
        hotelName: `Hotel ${i + 1}`,
        tradeLicenseImage: image,
      })),
    ];
    setHotelAdmins(mockHotelAdmins);
  }, []);

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  // Close the image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage(null);
  };

  // Handle remove admin button click
  const handleRemoveAdminClick = (adminId) => {
    setAdminToRemove(adminId);
    setOpenConfirmModal(true);
  };

  // Confirm removal of admin
  const confirmRemoveAdmin = () => {
    setHotelAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminToRemove));
    setOpenConfirmModal(false);
    setAdminToRemove(null);
  };

  // Close the confirmation modal
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setAdminToRemove(null);
  };

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = hotelAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(hotelAdmins.length / adminsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#222831',
        color: '#EEEEEE',
        minHeight: '100vh',
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#00ADB5',
          textAlign: 'center',
        }}
      >
        Hotel Admin Details
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#393E46',
          color: '#EEEEEE',
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
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Hotel Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Trade License</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAdmins.map((admin) => (
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
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.hotelName}</TableCell>
                <TableCell>
                  <Avatar
                    src={admin.tradeLicenseImage}
                    alt="Trade License"
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    onClick={() => handleImageClick(admin.tradeLicenseImage)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveAdminClick(admin.id)}
                    sx={{
                      backgroundColor: '#FF5252',
                      color: '#EEEEEE',
                      '&:hover': {
                        backgroundColor: '#FF1744',
                      },
                    }}
                  >
                    Remove Admin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          onClick={prevPage}
          disabled={currentPage === 1}
          sx={{
            backgroundColor: '#00ADB5',
            color: '#EEEEEE',
            '&:hover': {
              backgroundColor: '#0097A7',
            },
            mr: 2,
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(hotelAdmins.length / adminsPerPage)}
          sx={{
            backgroundColor: '#00ADB5',
            color: '#EEEEEE',
            '&:hover': {
              backgroundColor: '#0097A7',
            },
          }}
        >
          Next
        </Button>
      </Box>

      {/* Modal for displaying the enlarged image */}
      <Dialog open={openImageModal} onClose={handleCloseImageModal} maxWidth="sm" fullWidth>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#222831',
            p: 3,
            overflow: 'auto',
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
                width: '100%',
                height: 'auto',
                maxWidth: 'none',
                maxHeight: 'none',
                borderRadius: '8px',
              }}
            />
            <IconButton
              onClick={handleCloseImageModal}
              sx={{
                position: 'absolute',
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

      {/* Confirmation modal for removing admin */}
      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>This action will remove the admin permanently.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoveAdmin} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelAdmin;