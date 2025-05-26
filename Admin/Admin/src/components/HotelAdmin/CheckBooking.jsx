import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const API_BASE_URL = 'http://localhost:2000';

const CheckBooking = () => {
  const [bookingCode, setBookingCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentHotelAdminId, setCurrentHotelAdminId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmCheckInDialog, setConfirmCheckInDialog] = useState({
    open: false,
    bookingCode: null,
  });

  // Fetch current hotel admin ID on component mount
  useEffect(() => {
    const fetchHotelAdminId = async () => {
      try {
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Fetching hotel admin ID...`);
        const token = localStorage.getItem('token');
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Token exists:`, !!token);

        if (!token) {
          setError('No authentication token found. Please log in.');
          setSnackbar({ open: true, message: 'No authentication token found. Please log in.', severity: 'error' });
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/hotel-admin/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const adminData = response.data.data;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Received hotel admin data:`, adminData);

        const adminId = adminData.hotelAdminId || adminData._id;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Using hotelAdminId: ${adminId}, Type: ${typeof adminId}`);

        setCurrentHotelAdminId(adminId.toString());
      } catch (error) {
        console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Error fetching hotel admin ID:`, error);
        setError('Failed to verify your identity. Please log in again.');
        setSnackbar({
          open: true,
          message: 'Failed to verify your identity. Please log in again.',
          severity: 'error',
        });
      }
    };

    fetchHotelAdminId();
  }, []);

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
      const bookingResponse = await axios.get(`${API_BASE_URL}/api/bookings/code/${bookingCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookingData = bookingResponse.data.data;
      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Booking data received:`, bookingData);

      if (!bookingData) {
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No booking data found`);
        throw new Error('Booking not found');
      }

      console.log(
        `[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Current hotelAdminId: ${currentHotelAdminId}, Type: ${typeof currentHotelAdminId}`,
      );
      console.log(
        `[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Booking hotelAdminId: ${bookingData.hotelAdminId}, Type: ${typeof bookingData.hotelAdminId}`,
      );

      const bookingHotelAdminId = bookingData.hotelAdminId.toString();
      const currentAdminId = currentHotelAdminId?.toString();

      console.log(
        `[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Comparing IDs - Booking: ${bookingHotelAdminId}, Current: ${currentAdminId}`,
      );

      if (!currentAdminId || bookingHotelAdminId !== currentAdminId) {
        console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Authorization failed - ID mismatch`);
        throw new Error('You are not authorized to view this booking');
      }

      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Authorization successful, fetching user details...`);

      let userData = null;
      if (bookingData.userId) {
        try {
          const userResponse = await axios.get(`${API_BASE_URL}/api/users/${bookingData.userId}`);
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

  const handleOpenCheckInDialog = (bookingCode) => {
    setConfirmCheckInDialog({
      open: true,
      bookingCode,
    });
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

  const handleCloseCheckInDialog = () => {
    setConfirmCheckInDialog({
      open: false,
      bookingCode: null,
    });
  };

  const handleUpdateStatus = async () => {
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Update status initiated`);

    if (!searchResult || !currentHotelAdminId) {
      console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Missing required data for update`);
      setSnackbar({
        open: true,
        message: 'Missing booking or admin data',
        severity: 'error',
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Session expired. Please log in again.');
      }

      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Verifying ownership...`);
      console.log(`Booking hotelAdminId: ${searchResult.hotelAdminId}`);
      console.log(`Current hotelAdminId: ${currentHotelAdminId}`);

      const bookingHotelAdminId = searchResult.hotelAdminId.toString();
      const currentAdminId = currentHotelAdminId.toString();

      if (bookingHotelAdminId !== currentAdminId) {
        throw new Error('You are not authorized to update this booking');
      }

      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Sending update request for bookingCode ${searchResult.bookingCode}`);
      const response = await axios.put(
        `${API_BASE_URL}/api/bookings/update-status/${searchResult.bookingCode}`,
        { status: 'checked-in' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setSearchResult((prev) => ({ ...prev, status: 'checked-in' }));
      setSnackbar({ open: true, message: 'Status updated successfully', severity: 'success' });
      console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status updated successfully`);
    } catch (error) {
      console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Update error:`, error);
      setError(error.response?.data?.message || 'Failed to update status');
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update status',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      handleCloseCheckInDialog();
    }
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
                <TableCell sx={{ color: '#EEEEEE' }}>Action</TableCell>
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
                        borderRadius: '4px'
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
             <TableCell>
  <Button
    variant="contained"
    onClick={() => handleOpenCheckInDialog(searchResult.bookingCode)}
    disabled={loading || searchResult.status === 'checked-in' || searchResult.status === 'cancelled'}
    sx={{
      backgroundColor: searchResult.status === 'checked-in' ? '#4CAF50' : 
                      searchResult.status === 'canceled' ? '#F44336' : '#00ADB5',
      color: '#EEEEEE',
      '&:disabled': { backgroundColor: '#393E46' },
    }}
  >
    {loading ? (
      <CircularProgress size={24} color="inherit" />
    ) : searchResult.status === 'checked-in' ? (
      'Already Checked In'
    ) : searchResult.status === 'canceled' ? (
      'Booking Canceled'
    ) : (
      'Check In Guest'
    )}
  </Button>
</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmCheckInDialog.open}
        onClose={handleCloseCheckInDialog}
        aria-labelledby="confirm-check-in-dialog-title"
        PaperProps={{
          sx: {
            backgroundColor: '#393E46',
            color: '#EEEEEE',
          },
        }}
      >
        <DialogTitle id="confirm-check-in-dialog-title" sx={{ color: '#00ADB5' }}>
          Confirm Check-In
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#EEEEEE' }}>
            Are you sure you want to check in the guest for booking code {confirmCheckInDialog.bookingCode}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckInDialog} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            sx={{
              backgroundColor: '#00ADB5',
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: '#008c93',
              },
            }}
          >
            Confirm Check-In
          </Button>
        </DialogActions>
      </Dialog>
         {/* Image Dialog */}
      <Dialog 
        open={openImageDialog} 
        onClose={() => setOpenImageDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <img 
            src={selectedImage} 
            alt="Enlarged ID Proof" 
            style={{ width: '100%', borderRadius: '8px' }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)}>Close</Button>
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

export default CheckBooking;