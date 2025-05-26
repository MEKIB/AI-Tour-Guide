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
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000/api',
});

const HotelAdmin = () => {
  const [hotelAdmins, setHotelAdmins] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [adminToRemove, setAdminToRemove] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 10;

  useEffect(() => {
    fetchHotelAdmins();
  }, []);

  const fetchHotelAdmins = async () => {
    try {
      const response = await api.get('/approved-hotel-admins');
      setHotelAdmins(response.data);
    } catch (error) {
      console.error('Error fetching hotel admins:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage(null);
  };

  const handleRemoveAdminClick = (adminId) => {
    setAdminToRemove(adminId);
    setOpenConfirmModal(true);
  };

  const confirmRemoveAdmin = async () => {
    try {
      await api.delete(`/approved-hotel-admins/${adminToRemove}`);
      fetchHotelAdmins();
      setOpenConfirmModal(false);
      setAdminToRemove(null);
    } catch (error) {
      console.error('Error removing hotel admin:', error);
    }
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setAdminToRemove(null);
  };

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = hotelAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

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
        Approved Hotel Admin Details
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
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Middle Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Last Name</TableCell>
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
            {hotelAdmins.map((admin) => (
              <TableRow key={admin._id}>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.hotelAdminId}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.firstName}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.middleName}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.lastName}</TableCell>
                <TableCell>
                 <TableCell>
  <Avatar
    src={`http://localhost:2000${admin.passportId.url}`}
    alt="Passport/ID"
    sx={{ width: 60, height: 60, cursor: 'pointer' }}
    onClick={() => handleImageClick(`http://localhost:2000${admin.passportId.url}`)}
  />
</TableCell>
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.location}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.phoneNumber}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{admin.email}</TableCell>
                <TableCell>
                 <TableCell>
  <Avatar
    src={`http://localhost:2000${admin.tradeLicense.url}`}
    alt="Trade licence"
    sx={{ width: 60, height: 60, cursor: 'pointer' }}
    onClick={() => handleImageClick(`http://localhost:2000${admin.tradeLicense.url}`)}
  />
</TableCell>
                </TableCell>
                <TableCell>
                  <Avatar
    src={`http://localhost:2000${admin.managerId.url}`}
    alt="Manager  id"
    sx={{ width: 60, height: 60, cursor: 'pointer' }}
    onClick={() => handleImageClick(`http://localhost:2000${admin.managerId.url}`)}
  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveAdminClick(admin._id)}
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

      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle>Remove Hotel Admin?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this hotel admin?</Typography>
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