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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import image from "../../assets/13.jpg"; // Ensure this path is correct

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch users from the backend (mock data for now)
  useEffect(() => {
    const mockUsers = [
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        phoneNumber: `+251 912 345 ${i.toString().padStart(3, '0')}`,
        idPassport: `ID-${i + 1}`,
        status: 'active', // Set all users to "active"
        idPassportImage: image, // Use the imported image
      })),
    ];
    setUsers(mockUsers);
  }, []);

  // Handle remove user button click
  const handleRemoveUserClick = (userId) => {
    setUserToRemove(userId);
    setOpenConfirmModal(true);
  };

  // Confirm removal of user
  const confirmRemoveUser = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToRemove));
    setOpenConfirmModal(false);
    setUserToRemove(null);
  };

  // Close the confirmation modal
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setUserToRemove(null);
  };

  // Handle image click to open modal
  const handleImageClick = (imageUrl) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setOpenImageModal(true);
    }
  };

  // Close the image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage('');
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Filter users based on search email
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
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
        User Management
      </Typography>

      {/* Display total number of users */}
      <Typography variant="h6" sx={{ mb: 2, color: '#00ADB5' }}>
        Total Users: {filteredUsers.length}
      </Typography>

      {/* Search Bar */}
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
            '& fieldset': {
              borderColor: '#00ADB5',
            },
            '&:hover fieldset': {
              borderColor: '#00ADB5',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ADB5',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#00ADB5',
          },
          '& .MuiInputBase-input': {
            color: '#EEEEEE',
          },
        }}
      />

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
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID/Passport Image</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => {
              console.log(user.idPassportImage); // Debug the image path
              return (
                <TableRow key={user.id}>
                  <TableCell sx={{ color: '#EEEEEE' }}>{user.id}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{user.name}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{user.email}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleImageClick(user.idPassportImage)}>
                      <Avatar
                        src={user.idPassportImage}
                        alt="ID/Passport"
                        sx={{ width: 50, height: 50, cursor: 'pointer' }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{user.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveUserClick(user.id)}
                      sx={{
                        backgroundColor: '#FF5252',
                        color: '#EEEEEE',
                        '&:hover': {
                          backgroundColor: '#FF1744',
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
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

      {/* Confirmation Modal */}
      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>This action will permanently remove the user.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoveUser} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Modal */}
      <Dialog
        open={openImageModal}
        onClose={handleCloseImageModal}
        maxWidth="md"
        disableEnforceFocus // Add this prop
      >
        <DialogTitle>
          ID/Passport Image
          <IconButton
            onClick={handleCloseImageModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="ID/Passport"
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserManagement;