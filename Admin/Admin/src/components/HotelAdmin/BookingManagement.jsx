import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  TextField,
  Button,
  Select,
  MenuItem,
  Pagination,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const API_BASE_URL = 'http://localhost:2000';

const BookingManagement = ({ hotelAdminId: propHotelAdminId }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-05-23'));
  const [filterType, setFilterType] = useState('week');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [effectiveHotelAdminId, setEffectiveHotelAdminId] = useState(propHotelAdminId);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const itemsPerPage = 10;

  // Fetch hotelAdminId if not provided as prop
  useEffect(() => {
    const fetchHotelAdminId = async () => {
      if (!propHotelAdminId) {
        try {
          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Fetching hotelAdminId from /api/hotel-admin/me`);
          const token = localStorage.getItem('token');
          if (!token) {
            setError('No authentication token found. Please log in.');
            console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No token found`);
            return;
          }

          const response = await axios.get(`${API_BASE_URL}/api/hotel-admin/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Received hotelAdminId: ${response.data.data.hotelAdminId}`);
          setEffectiveHotelAdminId(response.data.data.hotelAdminId);
        } catch (error) {
          console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Error fetching hotelAdminId:`, error.response?.data?.message || error.message);
          setError('Failed to fetch hotel admin ID. Please log in again.');
        }
      }
    };

    fetchHotelAdminId();
  }, [propHotelAdminId]);

  // Log effectiveHotelAdminId
  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] BookingManagement component mounted with propHotelAdminId: ${propHotelAdminId}, using effectiveHotelAdminId: ${effectiveHotelAdminId}`);

  // Fetch bookings and user data
  useEffect(() => {
    const fetchBookingsAndUsers = async () => {
      if (!effectiveHotelAdminId) {
        setError('Hotel Admin ID is missing. Please ensure you are logged in.');
        console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No effectiveHotelAdminId provided`);
        return;
      }

      try {
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Starting fetchBookingsAndUsers for hotelAdminId: ${effectiveHotelAdminId}`);

        // Check if token exists for bookings
        const token = localStorage.getItem('token');
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Checking token: ${token ? 'Token found' : 'No token found'}`);
        if (!token) {
          setError('No authentication token found. Please log in.');
          console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No token found, aborting fetch`);
          return;
        }

        // Fetch bookings
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Fetching bookings from ${API_BASE_URL}/api/bookings/${effectiveHotelAdminId}`);
        const bookingResponse = await axios.get(`${API_BASE_URL}/api/bookings/${effectiveHotelAdminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Received booking response:`, bookingResponse.data);
        const bookingData = bookingResponse.data;

        if (bookingData.data && bookingData.data.length > 0) {
          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Processing ${bookingData.data.length} bookings`);
          // Fetch user details for each booking
          const bookingsWithUsers = await Promise.all(
            bookingData.data.map(async (booking) => {
              try {
                // Validate userId
                if (!booking.userId) {
                  console.warn(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No userId found for booking ${booking._id}`);
                  return {
                    ...booking,
                    guestName: 'Unknown',
                    email: '',
                    phone: '',
                    passportOrId: '',
                  };
                }

                console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Fetching user with userId: ${booking.userId} for booking ${booking._id}`);
                // Fetch user without token using userId
                const userResponse = await axios.get(`${API_BASE_URL}/api/users/${booking.userId}`, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Received user response for userId ${booking.userId}:`, userResponse.data);
                const userData = userResponse.data;

                return {
                  ...booking,
                  guestName: userData.data
                    ? `${userData.data.firstName} ${userData.data.middleName || ''} ${userData.data.lastName}`.trim()
                    : 'Unknown',
                  email: userData.data?.email || '',
                  phone: userData.data?.phone || '',
                  passportOrId: userData.data?.passportOrId || '',
                };
              } catch (error) {
                console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Error fetching user for booking ${booking._id} with userId ${booking.userId}:`, error.response?.data || error.message);
                return {
                  ...booking,
                  guestName: 'Unknown',
                  email: '',
                  phone: '',
                  passportOrId: '',
                };
              }
            })
          );
          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Setting bookings state with ${bookingsWithUsers.length} bookings`);
          setBookings(bookingsWithUsers);
          setError(null);
        } else {
          console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] No bookings found in response`);
          setBookings([]);
          setError('No bookings found.');
        }
      } catch (error) {
        console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Error fetching bookings:`, error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to fetch bookings.');
        setBookings([]);
      }
    };

    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Initiating fetchBookingsAndUsers`);
    fetchBookingsAndUsers();
  }, [effectiveHotelAdminId]);

  // Filter bookings based on the selected filter type and status
  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Filtering bookings, filterType: ${filterType}, statusFilter: ${statusFilter}`);
  const filteredBookings = bookings.filter((booking) => {
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    let dateFilterPassed = false;
    switch (filterType) {
      case 'date':
        dateFilterPassed = selectedDate >= checkInDate && selectedDate <= checkOutDate;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date filter (by date): booking ${booking._id}, checkIn: ${checkInDate}, checkOut: ${checkOutDate}, selectedDate: ${selectedDate}, passed: ${dateFilterPassed}`);
        break;
      case 'today':
        dateFilterPassed = today >= checkInDate && today <= checkOutDate;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date filter (today): booking ${booking._id}, checkIn: ${checkInDate}, checkOut: ${checkOutDate}, today: ${today}, passed: ${dateFilterPassed}`);
        break;
      case 'week':
        dateFilterPassed = startOfWeek <= checkOutDate && endOfWeek >= checkInDate;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date filter (week): booking ${booking._id}, checkIn: ${checkInDate}, checkOut: ${checkOutDate}, week: ${startOfWeek} - ${endOfWeek}, passed: ${dateFilterPassed}`);
        break;
      case 'month':
        dateFilterPassed = startOfMonth <= checkOutDate && endOfMonth >= checkInDate;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date filter (month): booking ${booking._id}, checkIn: ${checkInDate}, checkOut: ${checkOutDate}, month: ${startOfMonth} - ${endOfMonth}, passed: ${dateFilterPassed}`);
        break;
      case 'year':
        dateFilterPassed = startOfYear <= checkOutDate && endOfYear >= checkInDate;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date filter (year): booking ${booking._id}, checkIn: ${checkInDate}, checkOut: ${checkOutDate}, year: ${startOfYear} - ${endOfYear}, passed: ${dateFilterPassed}`);
        break;
      default:
        dateFilterPassed = true;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date filter (default): booking ${booking._id}, passed: ${dateFilterPassed}`);
    }

    let statusFilterPassed = false;
    switch (statusFilter) {
      case 'all':
        statusFilterPassed = true;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter (all): booking ${booking._id}, status: ${booking.status}, passed: ${statusFilterPassed}`);
        break;
      case 'check-in':
        statusFilterPassed = booking.status === 'check-in';
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter (check-in): booking ${booking._id}, status: ${booking.status}, passed: ${statusFilterPassed}`);
        break;
      case 'checked-in':
        statusFilterPassed = booking.status === 'checked-in';
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter (checked-in): booking ${booking._id}, status: ${booking.status}, passed: ${statusFilterPassed}`);
        break;
      default:
        statusFilterPassed = true;
        console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter (default): booking ${booking._id}, status: ${booking.status}, passed: ${statusFilterPassed}`);
    }

    const passed = dateFilterPassed && statusFilterPassed;
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Final filter result for booking ${booking._id}: ${passed}`);
    return passed;
  });

  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Filtered bookings count: ${filteredBookings.length}`);

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Paginated bookings count: ${paginatedBookings.length}, page: ${currentPage}, totalPages: ${totalPages}`);

  // Handle image click to open dialog
  const handleImageClick = (imageUrl) => {
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Image clicked: ${imageUrl}`);
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Closing image dialog`);
    setOpenImageDialog(false);
    setSelectedImage('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, backgroundColor: '#222831', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#EEEEEE' }}>
          Booking Management
        </Typography>

        {/* Display error message if any */}
        {error && (
          <Typography variant="body1" sx={{ color: '#FF5555', mb: 2 }}>
            {error}
          </Typography>
        )}
        {console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Rendering error message: ${error}`)}

        {/* Warning if hotelAdminId is undefined */}
        {!effectiveHotelAdminId && (
          <Typography variant="body1" sx={{ color: '#FF5555', mb: 2 }}>
            Error: Hotel Admin ID is not available. Please log in or contact support.
          </Typography>
        )}

        {/* Filter Controls */}
        {effectiveHotelAdminId && (
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Select
              value={filterType}
              onChange={(e) => {
                console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Filter type changed to: ${e.target.value}`);
                setFilterType(e.target.value);
              }}
              sx={{ backgroundColor: '#393E46', color: '#EEEEEE', width: '150px' }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#2D2D2D',
                    color: '#EEEEEE',
                    '& .MuiMenuItem-root': {
                      color: '#EEEEEE',
                      '&:hover': {
                        backgroundColor: '#393E46',
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="date">By Date</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>

            {filterType === 'date' && (
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => {
                  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Date picker changed to: ${newValue}`);
                  setSelectedDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      backgroundColor: '#00ADB5 !important',
                      borderRadius: 1,
                      '& .MuiInputBase-input': {
                        color: '#EEEEEE !important',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#EEEEEE !important',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#00ADB5 !important',
                        },
                        '&:hover fieldset': {
                          borderColor: '#00ADB5 !important',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00ADB5 !important',
                        },
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#EEEEEE !important',
                      },
                    }}
                  />
                )}
              />
            )}

            {/* Status Filter Buttons */}
            <Button
              variant={statusFilter === 'all' ? 'contained' : 'outlined'}
              onClick={() => {
                console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter changed to: all`);
                setStatusFilter('all');
              }}
              sx={{ backgroundColor: statusFilter === 'all' ? '#00ADB5' : '#393E46', color: '#EEEEEE' }}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'check-in' ? 'contained' : 'outlined'}
              onClick={() => {
                console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter changed to: check-in`);
                setStatusFilter('check-in');
              }}
              sx={{ backgroundColor: statusFilter === 'check-in' ? '#00ADB5' : '#393E46', color: '#EEEEEE' }}
            >
              Check-In
            </Button>
            <Button
              variant={statusFilter === 'checked-in' ? 'contained' : 'outlined'}
              onClick={() => {
                console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Status filter changed to: checked-in`);
                setStatusFilter('checked-in');
              }}
              sx={{ backgroundColor: statusFilter === 'checked-in' ? '#00ADB5' : '#393E46', color: '#EEEEEE' }}
            >
              Checked-In
            </Button>
          </Box>
        )}

        {/* Bookings Table */}
        {effectiveHotelAdminId && (
          <>
            {console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Rendering table with ${paginatedBookings.length} bookings`)}
            <TableContainer component={Paper} sx={{ backgroundColor: '#393E46' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#EEEEEE' }}>Guest Name</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Email</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Phone</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Passport/ID</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Hotel Name</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Room Type</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Room Number</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Check-In</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Check-Out</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Guests</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Total Price</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>Status</TableCell>
                    {/* <TableCell sx={{ color: '#EEEEEE' }}>Booking Code</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedBookings.length > 0 ? (
                    paginatedBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        {console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Rendering booking row: ${booking._id}`)}
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.guestName}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.email}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.phone}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>
                          {booking.passportOrId ? (
                            <Box
                              sx={{
                                cursor: 'pointer',
                                display: 'inline-block',
                              }}
                              onClick={() => handleImageClick(`http://localhost:2000/${booking.passportOrId}`)}
                            >
                              <img
                                src={`http://localhost:2000/${booking.passportOrId}`}
                                alt="Passport/ID"
                                style={{
                                  maxWidth: '100px',
                                  maxHeight: '60px',
                                  objectFit: 'contain',
                                  borderRadius: '4px',
                                }}
                                onError={(e) => {
                                  console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Failed to load image for booking ${booking._id}: http://localhost:2000/${booking.passportOrId}`);
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                            </Box>
                          ) : (
                            <span style={{ display: 'block', color: '#EEEEEE' }}>No Image</span>
                          )}
                          <span style={{ display: 'none', color: '#FF5555' }}>Image Failed to Load</span>
                        </TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.hotelName}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.roomType}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.roomNumber}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>
                          {new Date(booking.checkInDate).toLocaleDateString('en-US', { timeZone: 'Africa/Nairobi' })}
                        </TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>
                          {new Date(booking.checkOutDate).toLocaleDateString('en-US', { timeZone: 'Africa/Nairobi' })}
                        </TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.guests}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>ETB {booking.totalPrice}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{booking.status}</TableCell>
                        {/* <TableCell sx={{ color: '#EEEEEE' }}>{booking.bookingCode}</TableCell> */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={13} sx={{ color: '#EEEEEE', textAlign: 'center' }}>
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Image Popup Dialog */}
            <Dialog
              open={openImageDialog}
              onClose={handleCloseDialog}
              maxWidth="lg"
              fullWidth
              sx={{
                '& .MuiDialog-paper': {
                  backgroundColor: '#222831',
                  color: '#EEEEEE',
                  width: '90vw',
                  maxWidth: '800px',
                },
              }}
            >
              <DialogContent sx={{ padding: 0 }}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Enlarged Passport/ID"
                    style={{
                      width: '100%',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                    onError={(e) => {
                      console.error(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Failed to load enlarged image: ${selectedImage}`);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : (
                  <Typography sx={{ color: '#FF5555', textAlign: 'center', p: 2 }}>
                    No Image Available
                  </Typography>
                )}
                <Typography sx={{ display: 'none', color: '#FF5555', textAlign: 'center', mt: 2 }}>
                  Image Failed to Load
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseDialog}
                  sx={{ color: '#EEEEEE', backgroundColor: '#00ADB5', '&:hover': { backgroundColor: '#008c93' } }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => {
                    console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] Pagination changed to: page ${page}`);
                    setCurrentPage(page);
                  }}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#EEEEEE !important',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#00ADB5 !important',
                      color: '#EEEEEE !important',
                      '&:hover': {
                        backgroundColor: '#00ADB5 !important',
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default BookingManagement;