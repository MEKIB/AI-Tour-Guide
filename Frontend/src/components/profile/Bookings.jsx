import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  Avatar,
  Paper,
  Tabs,
  Tab,
  Badge,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Hotel,
  CalendarToday,
  KingBed,
  People,
  Cancel,
  CheckCircle,
  AccessTime,
  Star,
  Receipt,
  Home,
  History,
  Timeline,
  MonetizationOn,
  DateRange,
  Analytics,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const ColorButton = styled(Button)({
  backgroundColor: '#00ADB5',
  color: '#EEEEEE',
  '&:hover': {
    backgroundColor: '#008B8B',
  },
});

const StatusChip = styled(Chip)({
  fontWeight: 'bold',
  color: '#EEEEEE',
});

const BookingAnalytics = ({ bookings }) => {
  const [timeRange, setTimeRange] = useState('month');

  const calculateTotalSpending = (range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(0); // All time
    }

    return bookings
      .filter((booking) => {
        const bookingDate = new Date(booking.checkIn);
        return bookingDate >= startDate && booking.status !== 'cancelled';
      })
      .reduce((total, booking) => total + booking.totalPrice, 0);
  };

  const totalSpent = calculateTotalSpending(timeRange);

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'week':
        return 'Last Week';
      case 'month':
        return 'Last Month';
      case 'year':
        return 'Last Year';
      default:
        return 'All Time';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{
            backgroundColor: '#393E46',
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: '#00ADB5' }}>
                <MonetizationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                Booking Analytics
              </Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: '#EEEEEE' }}>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  label="Time Range"
                  sx={{
                    color: '#EEEEEE',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00ADB5',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00ADB5',
                    },
                  }}
                >
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ backgroundColor: '#00ADB5', mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    backgroundColor: '#222831',
                    p: 2,
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#EEEEEE', mb: 1 }}>
                    <DateRange sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {getTimeRangeLabel()} Spending
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#00ADB5' }}>
                    ${totalSpent.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#EEEEEE', mt: 1 }}>
                    Total across all completed bookings
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    backgroundColor: '#222831',
                    p: 2,
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#EEEEEE', mb: 1 }}>
                    <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Booking Trends
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100px',
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
                      {timeRange === 'week' && 'Weekly spending analytics coming soon'}
                      {timeRange === 'month' && 'Monthly booking trends coming soon'}
                      {timeRange === 'year' && 'Annual booking patterns coming soon'}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const BookingHistory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [cancelDialog, setCancelDialog] = useState({
    open: false,
    bookingId: null,
    bookingName: '',
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;
  const isLoggedIn = !!token && !!userId;

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Log environment variable for debugging
  console.log('Backend API URL:', BACKEND_API_URL);

  // Fetch booking history
  useEffect(() => {
    const fetchBookings = async () => {
      if (!isLoggedIn) {
        setError('Please log in to view your booking history');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_API_URL}/api/bookingHistory/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedBookings = response.data.data;
        setBookings(fetchedBookings);
        setError('');
      } catch (err) {
        console.error('Error fetching booking history:', err);
        setError(
          err.response?.data?.message || 'Failed to fetch booking history. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isLoggedIn, token, BACKEND_API_URL]);

  // Handle cancellation API call
  const confirmCancelBooking = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/bookingHistory/${cancelDialog.bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === cancelDialog.bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );

      setSnackbar({
        open: true,
        message: `Booking for ${cancelDialog.bookingName} has been cancelled`,
        severity: 'success',
      });
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to cancel booking',
        severity: 'error',
      });
    } finally {
      handleCloseCancelDialog();
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenCancelDialog = (bookingId, bookingName) => {
    setCancelDialog({
      open: true,
      bookingId,
      bookingName,
    });
  };

  const handleCloseCancelDialog = () => {
    setCancelDialog({
      open: false,
      bookingId: null,
      bookingName: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredBookings = bookings.filter((booking) => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return booking.status === 'upcoming';
    if (tabValue === 2) return booking.status === 'completed';
    if (tabValue === 3) return booking.status === 'cancelled';
    return true;
  });

  const getStatusChip = (status) => {
    switch (status) {
      case 'upcoming':
        return (
          <StatusChip
            icon={<AccessTime style={{ color: '#EEEEEE' }} />}
            label="Upcoming"
            sx={{ backgroundColor: '#FFA500' }}
          />
        );
      case 'completed':
        return (
          <StatusChip
            icon={<CheckCircle style={{ color: '#EEEEEE' }} />}
            label="Completed"
            sx={{ backgroundColor: '#4CAF50' }}
          />
        );
      case 'cancelled':
        return (
          <StatusChip
            icon={<Cancel style={{ color: '#EEEEEE' }} />}
            label="Cancelled"
            sx={{ backgroundColor: '#F44336' }}
          />
        );
      default:
        return null;
    }
  };

  const isUpcomingAndCancelable = (status) => {
    return status === 'upcoming';
  };

  return (
    <Box
      sx={{
        backgroundColor: '#222831',
        minHeight: '100vh',
        p: 3,
        color: '#EEEEEE',
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, color: '#00ADB5' }}>
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#00ADB5',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#EEEEEE',
          }}
        >
          <History sx={{ mr: 0.5 }} fontSize="inherit" />
          Booking History
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3, color: '#00ADB5', fontWeight: 'bold' }}>
        My Bookings
      </Typography>

      <Paper sx={{ mb: 3, backgroundColor: '#393E46' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': { color: '#EEEEEE' },
            '& .Mui-selected': { color: '#00ADB5' },
          }}
        >
          <Tab
            label={
              <Badge badgeContent={bookings.length} color="primary">
                All
              </Badge>
            }
          />
          <Tab
            label={
              <Badge
                badgeContent={bookings.filter((b) => b.status === 'upcoming').length}
                color="primary"
              >
                Upcoming
              </Badge>
            }
          />
          <Tab
            label={
              <Badge
                badgeContent={bookings.filter((b) => b.status === 'completed').length}
                color="primary"
              >
                Completed
              </Badge>
            }
          />
          <Tab
            label={
              <Badge
                badgeContent={bookings.filter((b) => b.status === 'cancelled').length}
                color="primary"
              >
                Cancelled
              </Badge>
            }
          />
          <Tab
            icon={<Analytics />}
            iconPosition="start"
            label="Analytics"
            sx={{
              '&.Mui-selected': {
                color: '#00ADB5',
              },
            }}
          />
        </Tabs>
      </Paper>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
          }}
        >
          <CircularProgress sx={{ color: '#00ADB5' }} />
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            backgroundColor: '#393E46',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="#EEEEEE">
            {error}
          </Typography>
        </Box>
      ) : tabValue === 4 ? (
        <BookingAnalytics bookings={bookings} />
      ) : filteredBookings.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            backgroundColor: '#393E46',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="#EEEEEE">
            No bookings found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Card
                sx={{
                  backgroundColor: '#393E46',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          src={booking.image}
                          variant="rounded"
                          sx={{
                            width: '100%',
                            height: 180,
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h5" sx={{ color: '#00ADB5' }}>
                            {booking.hotelName}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            {getStatusChip(booking.status)}
                            {booking.rating && (
                              <Chip
                                icon={<Star style={{ color: '#FFD700' }} />}
                                label={booking.rating}
                                sx={{
                                  ml: 1,
                                  backgroundColor: 'transparent',
                                  color: '#FFD700',
                                  border: '1px solid #FFD700',
                                }}
                              />
                            )}
                          </Box>
                        </Box>

                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <KingBed sx={{ mr: 1, color: '#00ADB5' }} />
                              <Typography>{booking.roomType}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Hotel sx={{ mr: 1, color: '#00ADB5' }} />
                              <Typography>Room {booking.roomNumber}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <People sx={{ mr: 1, color: '#00ADB5' }} />
                              <Typography>
                                {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ mr: 1, color: '#00ADB5' }} />
                              <Typography>Check-in: {booking.checkIn}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ mr: 1, color: '#00ADB5' }} />
                              <Typography>Check-out: {booking.checkOut}</Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Divider sx={{ my: 2, backgroundColor: '#00ADB5' }} />

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Receipt sx={{ mr: 1, color: '#00ADB5' }} />
                            <Typography variant="h6" sx={{ color: '#EEEEEE' }}>
                              ${booking.totalPrice}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          p: 2,
                        }}
                      >
                        {isUpcomingAndCancelable(booking.status) ? (
                          <>
                            <ColorButton
                              variant="contained"
                              startIcon={<Cancel />}
                              onClick={() =>
                                handleOpenCancelDialog(booking.id, booking.hotelName)
                              }
                              sx={{ mb: 2, width: '100%' }}
                            >
                              Cancel Booking
                            </ColorButton>
                            <Button
                              variant="outlined"
                              sx={{
                                color: '#00ADB5',
                                borderColor: '#00ADB5',
                                width: '100%',
                                '&:hover': {
                                  borderColor: '#008B8B',
                                },
                              }}
                            >
                              Modify Booking
                            </Button>
                          </>
                        ) : booking.status === 'completed' ? (
                          <>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: '#4CAF50',
                                color: '#EEEEEE',
                                mb: 2,
                                width: '100%',
                                '&:hover': {
                                  backgroundColor: '#3e8e41',
                                },
                              }}
                            >
                              Book Again
                            </Button>
                            <Button
                              variant="outlined"
                              sx={{
                                color: '#00ADB5',
                                borderColor: '#00ADB5',
                                width: '100%',
                                '&:hover': {
                                  borderColor: '#008B8B',
                                },
                              }}
                            >
                              Leave Review
                            </Button>
                          </>
                        ) : null}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={cancelDialog.open}
        onClose={handleCloseCancelDialog}
        aria-labelledby="cancel-booking-dialog-title"
        PaperProps={{
          sx: {
            backgroundColor: '#393E46',
            color: '#EEEEEE',
          },
        }}
      >
        <DialogTitle id="cancel-booking-dialog-title" sx={{ color: '#00ADB5' }}>
          Confirm Cancellation
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#EEEEEE' }}>
            Are you sure you want to cancel your booking at {cancelDialog.bookingName}?
          </DialogContentText>
          <DialogContentText sx={{ color: '#EEEEEE', mt: 2 }}>
            Cancellation fees may apply depending on the hotel's policy.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} sx={{ color: '#EEEEEE' }}>
            Go Back
          </Button>
          <Button
            onClick={confirmCancelBooking}
            sx={{
              backgroundColor: '#F44336',
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: '#D32F2F',
              },
            }}
            startIcon={<Cancel />}
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingHistory;