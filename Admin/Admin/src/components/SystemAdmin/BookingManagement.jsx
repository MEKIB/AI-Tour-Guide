import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';

const API_BASE_URL = 'http://localhost:2000';

const BookingManagement = () => {
  const [bookingCode, setBookingCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSearch = async () => {
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Search initiated for booking code: ${bookingCode}`);

    if (!bookingCode.trim()) {
      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Empty booking code entered`);
      setError('Please enter a booking code.');
      setSnackbar({ open: true, message: 'Please enter a booking code', severity: 'error' });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Token for search:`, token ? 'Exists' : 'Missing');

      if (!token) throw new Error('No authentication token found');

      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Fetching booking data...`);
      const bookingResponse = await axios.get(`${API_BASE_URL}/api/systembookings/code/${bookingCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookingData = bookingResponse.data.data;
      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Booking data received:`, bookingData);

      if (!bookingData) {
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No booking data found`);
        throw new Error('Booking not found');
      }

      let userData = null;
      if (bookingData.userId) {
        try {
          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Fetching user data for userId: ${bookingData.userId}`);
          const userResponse = await axios.get(`${API_BASE_URL}/api/systemusers/${bookingData.userId}`);
          userData = userResponse.data.data;
          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] User data fetched:`, userData);
        } catch (userError) {
          console.warn(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Failed to fetch user details:`, userError);
        }
      }

      setSearchResult({
        ...bookingData,
        guestName: userData
          ? `${userData.firstName} ${userData.middleName || ''} ${userData.lastName}`.trim()
          : 'Guest',
        email: userData?.email || '',
        phone: userData?.phone || '',
        passportOrId: userData?.passportOrId || '',
      });

      setError(null);
      setSnackbar({ open: true, message: 'Booking found', severity: 'success' });
      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Search completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Search error:`, error);
      setError(error.response?.data?.message || error.message);
      setSearchResult(null);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Image clicked: ${imageUrl}`);
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => {
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Closing image dialog`);
    setOpenImageDialog(false);
    setSelectedImage('');
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#222831', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#EEEEEE' }}>
        Booking Lookup
      </Typography>

      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Enter Booking Code"
          value={bookingCode}
          onChange={(e) => setBookingCode(e.target.value)}
          sx={{
            backgroundColor: '#393E46',
            '& .MuiInputBase-input': { color: '#EEEEEE' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#00ADB5' },
              '&:hover fieldset': { borderColor: '#00ADB5' },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: '#00ADB5',
            color: '#EEEEEE',
            '&:hover': { backgroundColor: '#008c93' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </Button>
      </Box>

      {/* Results Section */}
      {searchResult && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#393E46', mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>Guest</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Contact</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Passport/ID</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Room Details</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Dates</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>{searchResult.guestName}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>
                  <div>{searchResult.email}</div>
                  <div>{searchResult.phone}</div>
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>
                  {searchResult.passportOrId ? (
                    <img
                      src={`${API_BASE_URL}/${searchResult.passportOrId}`}
                      alt="ID Proof"
                      style={{
                        maxWidth: '100px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      onClick={() => handleImageClick(`${API_BASE_URL}/${searchResult.passportOrId}`)}
                    />
                  ) : 'N/A'}
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>
                  {searchResult.hotelName} - {searchResult.roomType} (#{searchResult.roomNumber})
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>
                  <div>Check-in: {new Date(searchResult.checkInDate).toLocaleDateString()}</div>
                  <div>Check-out: {new Date(searchResult.checkOutDate).toLocaleDateString()}</div>
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>
                  <Box
                    sx={{
                      color: searchResult.status === 'checked-in' ? '#4CAF50' : '#FFA500',
                      fontWeight: 'bold',
                    }}
                  >
                    {searchResult.status.toUpperCase()}
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#393E46',
            color: '#EEEEEE',
          },
        }}
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Enlarged ID Proof"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: '#EEEEEE',
              backgroundColor: '#00ADB5',
              '&:hover': { backgroundColor: '#008c93' },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingManagement;