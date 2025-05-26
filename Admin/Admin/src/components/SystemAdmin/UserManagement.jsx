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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const BACKEND_API_URL = 'http://localhost:2000';

  // Decode JWT token to check role
  const getUserRole = (token) => {
    console.log('Decoding token:', token); // Debug
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload); // Debug
      return payload.role;
    } catch (error) {
      console.error('Error decoding token:', error.message); // Debug
      return null;
    }
  };

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Starting fetchUsers'); // Debug
        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug

        if (!token) {
          console.log('No token found'); // Debug
          setNotification({
            open: true,
            message: 'Please log in to view users',
            severity: 'error',
          });
          navigate('/admin/login');
          return;
        }

        const role = getUserRole(token);
        console.log('User role:', role); // Debug
        if (role !== 'admin') {
          console.log('Non-admin user detected'); // Debug
          setNotification({
            open: true,
            message: 'Admin access required',
            severity: 'error',
          });
          navigate('/');
          return;
        }

        console.log('Sending GET request to:', `${BACKEND_API_URL}/users`); // Debug
        const response = await axios.get(`${BACKEND_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Users fetched:', response.data); // Debug
        setUsers(response.data);
      } catch (error) {
        console.error('Fetch error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        }); // Debug
        setNotification({
          open: true,
          message: error.response?.data?.message || 'Failed to fetch users',
          severity: 'error',
        });
        if (error.response?.status === 401) {
          console.log('401 Unauthorized, redirecting to login'); // Debug
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setNotification({
            open: true,
            message: 'Session expired. Please log in again.',
            severity: 'error',
          });
          navigate('/admin/login');
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  // Handle remove user button click
  const handleRemoveUserClick = (userId) => {
    console.log('Remove clicked for user:', userId); // Debug
    setUserToRemove(userId);
    setOpenConfirmModal(true);
  };

  // Confirm removal of user
  const confirmRemoveUser = async () => {
    try {
      console.log('Confirming user removal:', userToRemove); // Debug
      const token = localStorage.getItem('token');
      console.log('Token for delete:', token); // Debug

      if (!token) {
        console.log('No token for delete'); // Debug
        setNotification({
          open: true,
          message: 'Please log in to perform this action',
          severity: 'error',
        });
        navigate('/admin/login');
        return;
      }

      console.log('Sending DELETE request to:', `${BACKEND_API_URL}/users/${userToRemove}`); // Debug
      await axios.delete(`${BACKEND_API_URL}/users/${userToRemove}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User removed successfully'); // Debug
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToRemove));
      setNotification({
        open: true,
        message: 'User removed successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Delete error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      }); // Debug
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to remove user',
        severity: 'error',
      });
      if (error.response?.status === 401) {
        console.log('401 Unauthorized on delete, redirecting'); // Debug
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setNotification({
          open: true,
          message: 'Session expired. Please log in again.',
          severity: 'error',
        });
        navigate('/admin/login');
      }
    } finally {
      setOpenConfirmModal(false);
      setUserToRemove(null);
    }
  };

  // Close the confirmation modal
  const handleCloseConfirmModal = () => {
    console.log('Closing confirm modal'); // Debug
    setOpenConfirmModal(false);
    setUserToRemove(null);
  };

  // Handle image click to open modal
  const handleImageClick = (imageUrl) => {
    console.log('Image clicked:', imageUrl); // Debug
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setOpenImageModal(true);
    }
  };

  // Close the image modal
  const handleCloseImageModal = () => {
    console.log('Closing image modal'); // Debug
    setOpenImageModal(false);
    setSelectedImage('');
  };

  // Close notification
  const handleCloseNotification = () => {
    console.log('Closing notification'); // Debug
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  console.log('Filtered users:', filteredUsers.length); // Debug

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
        User Management
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: '#00ADB5' }}>
        Total Users: {filteredUsers.length}
      </Typography>
      <TextField
        fullWidth
        label="Search by Email"
        variant="outlined"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        sx={{
          mb: 4,
          backgroundColor: '#393E46',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
          },
          '& .MuiInputLabel-root': { color: '#00ADB5' },
          '& .MuiInputBase-input': { color: '#EEEEEE' },
        }}
      />
      <TableContainer component={Paper} sx={{ backgroundColor: '#393E46', borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID/Passport Image</TableCell>
              {/* <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Status</TableCell> */}
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: '#EEEEEE' }}>{user.id}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{user.name}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{user.email}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{user.phoneNumber}</TableCell>
               <TableCell>
  <IconButton onClick={() => handleImageClick(`http://localhost:2000/${user.idPassportImage}`)}>
    <Avatar 
      src={`http://localhost:2000/${user.idPassportImage}`} 
      alt="ID/Passport" 
      sx={{ width: 50, height: 50, cursor: 'pointer' }} 
    />
  </IconButton>
</TableCell>
                {/* <TableCell sx={{ color: '#EEEEEE' }}>{user.status}</TableCell> */}
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveUserClick(user.id)}
                    sx={{
                      backgroundColor: '#FF5252',
                      color: '#EEEEEE',
                      '&:hover': { backgroundColor: '#FF1744' },
                    }}
                  >
                    Remove
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          sx={{
            backgroundColor: '#00ADB5',
            color: '#EEEEEE',
            '&:hover': { backgroundColor: '#0097A7' },
            mr: 2,
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
          sx={{
            backgroundColor: '#00ADB5',
            color: '#EEEEEE',
            '&:hover': { backgroundColor: '#0097A7' },
          }}
        >
          Next
        </Button>
      </Box>
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        PaperProps={{ sx: { backgroundColor: '#393E46' } }}
      >
        <DialogTitle sx={{ color: '#00ADB5' }}>Are you sure?</DialogTitle>
        <DialogContent sx={{ color: '#EEEEEE' }}>
          <Typography>This action will permanently remove the user.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
          <Button onClick={confirmRemoveUser} sx={{ color: '#FF5252' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openImageModal}
        onClose={handleCloseImageModal}
        maxWidth="md"
        PaperProps={{ sx: { backgroundColor: '#393E46' } }}
      >
        <DialogTitle sx={{ color: '#00ADB5' }}>
          ID/Passport Image
          <IconButton onClick={handleCloseImageModal} sx={{ position: 'absolute', right: 8, top: 8, color: '#EEEEEE' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
       <DialogContent>
  {selectedImage && (
    <img 
      src={selectedImage} 
      alt="ID/Passport" 
      style={{ 
        width: '800px',  // Fixed width
        height: 'auto',  // Maintain aspect ratio
        maxWidth: '90vw', // Ensure it doesn't overflow on small screens
        maxHeight: '90vh', // Ensure it fits within the viewport
        borderRadius: 8,
        objectFit: 'contain' // Prevents stretching
      }} 
    />
  )}
</DialogContent>
      </Dialog>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;