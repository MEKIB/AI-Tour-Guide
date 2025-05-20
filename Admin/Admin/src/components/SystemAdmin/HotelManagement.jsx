import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
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
  Snackbar,
  Alert,
} from '@mui/material';
import { Delete, Close } from '@mui/icons-material';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch hotels from the backend (mock data for now)
  useEffect(() => {
    const mockHotels = [
      { id: 1, name: 'Hotel A', location: 'New York' },
      { id: 2, name: 'Hotel B', location: 'Los Angeles' },
      { id: 3, name: 'Hotel C', location: 'Chicago' },
      { id: 4, name: 'Hotel D', location: 'Miami' },
      { id: 5, name: 'Hotel E', location: 'San Francisco' },
    ];
    setHotels(mockHotels);
  }, []);

  // Open delete confirmation dialog
  const openDeleteDialog = (hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setHotelToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Delete hotel
  const deleteHotel = () => {
    setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== hotelToDelete.id));
    setNotification({
      open: true,
      message: `Hotel ${hotelToDelete.name} deleted successfully.`,
      severity: 'success',
    });
    closeDeleteDialog();
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Filter hotels based on search query
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        padding: 3,
        background: '#222831',
        minHeight: '100vh',
        color: '#EEEEEE',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#00ADB5', fontWeight: 'bold' }}>
        Hotel Management
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search hotels by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 3,
          background: '#393E46',
          borderRadius: 1,
          '& .MuiInputBase-input': {
            color: '#EEEEEE',
          },
          '& .MuiInputLabel-root': {
            color: '#EEEEEE',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00ADB5',
            },
            '&:hover fieldset': {
              borderColor: '#00ADB5',
            },
          },
        }}
      />

      {/* Hotel Table */}
      <TableContainer component={Paper} sx={{ background: '#393E46', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.id}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.name}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.location}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => openDeleteDialog(hotel)}
                    startIcon={<Delete />}
                    sx={{
                      bgcolor: '#00ADB5',
                      color: '#EEEEEE',
                      '&:hover': { bgcolor: '#0097A7' },
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#393E46',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#393E46',
            color: '#00ADB5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Delete Hotel
          </Typography>
          <Button
            onClick={closeDeleteDialog}
            sx={{
              minWidth: 0,
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#393E46', color: '#EEEEEE', py: 2 }}>
          <Typography sx={{ color: '#EEEEEE' }}>
            Are you sure you want to delete {hotelToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#393E46', py: 1.5 }}>
          <Button
            onClick={closeDeleteDialog}
            sx={{
              border: '1px solid #00ADB5',
              color: '#00ADB5',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 173, 181, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteHotel}
            sx={{
              backgroundColor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#0097A7',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HotelManagement;