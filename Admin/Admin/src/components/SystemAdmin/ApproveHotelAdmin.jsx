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
import axios from 'axios';

const ApproveHotelAdmin = () => {
  const [pendingHotelAdmins, setPendingHotelAdmins] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pending Hotel Admins from the backend
  useEffect(() => {
    const fetchPendingHotelAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/hotel-admins');
        const adminsWithFullUrls = response.data.map((admin) => ({
          id: admin._id,
          name: `${admin.firstName} ${admin.middleName || ''} ${admin.lastName}`.trim(),
          passportImage: `http://localhost:2000${admin.passportId.url}`,
          location: admin.location,
          phoneNumber: admin.phoneNumber,
          email: admin.email,
          tradeLicenseImage: `http://localhost:2000${admin.tradeLicense.url}`,
          managerIdImage: `http://localhost:2000${admin.managerId.url}`,
        }));
        setPendingHotelAdmins(adminsWithFullUrls);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch pending hotel admins');
        setLoading(false);
      }
    };
    fetchPendingHotelAdmins();
  }, []);

  // Approve a Hotel Admin
  const approveHotelAdmin = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:2000/api/hotel-admins/approve/${userId}`);
      setPendingHotelAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== userId));
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve hotel admin');
    }
  };
  

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#222831', color: '#EEEEEE', minHeight: '100vh', p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ backgroundColor: '#222831', color: '#EEEEEE', minHeight: '100vh', p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#222831',
        color: '#EEEEEE',
        minHeight: '100vh',
        p: 4,
      }}
    >
      {/* Link to External Website */}
      <Button
        variant="contained"
        onClick={() => window.open('https://etrade.gov.et/business-license-checker', '_blank')}
        sx={{
          backgroundColor: '#00ADB5',
          color: '#EEEEEE',
          '&:hover': { backgroundColor: '#0097A7' },
          mb: 4,
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
          color: '#00ADB5',
          textAlign: 'center',
        }}
      >
        Approve Hotel Admin Accounts
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
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Trade License</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Manager ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingHotelAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} sx={{ color: '#EEEEEE', textAlign: 'center' }}>
                  No pending hotel admins found
                </TableCell>
              </TableRow>
            ) : (
              pendingHotelAdmins.map((admin) => (
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
                        backgroundColor: '#00ADB5',
                        color: '#EEEEEE',
                        '&:hover': { backgroundColor: '#0097A7' },
                      }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
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
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#EEEEEE',
                backgroundColor: '#00ADB5',
                '&:hover': { backgroundColor: '#0097A7' },
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