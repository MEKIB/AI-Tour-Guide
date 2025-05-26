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
import AskRefund from './AskRefund';

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
        startDate = new Date(0);
    }

    return bookings
      .filter((booking) => {
        const bookingDate = new Date(booking.checkIn);
        return bookingDate >= startDate && booking.status !== 'cancelled';
      })
      .reduce((total, booking) => {
        const price = booking.totalPrice || 0;
        return total + price;
      }, 0);
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
                    {getTimeRangeLabel()} Total Spending
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#00ADB5' }}>
                    ${totalSpent.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#EEEEEE', mt: 1 }}>
                    Total for all non-cancelled bookings
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
    bookingCode: null,
    bookingName: '',
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setToken(storedToken);
          setUserId(user?.id);
          setIsLoggedIn(true);
        } catch (e) {
          console.error('Error parsing user data:', e);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  // Fetch booking history when auth is checked and user is logged in
  useEffect(() => {
    const fetchBookings = async () => {
      if (!authChecked) return; // Wait until auth check is complete
      
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

        const fetchedBookings = response.data.data || [];
        const validBookings = fetchedBookings.filter(
          (booking) => booking.bookingCode && typeof booking.bookingCode === 'string'
        );
        setBookings(validBookings);
        if (fetchedBookings.length !== validBookings.length) {
          console.warn('Some bookings were filtered out due to invalid bookingCode');
        }
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
  }, [isLoggedIn, token, BACKEND_API_URL, authChecked]);

  const confirmCancelBooking = async () => {
    if (!cancelDialog.bookingCode || typeof cancelDialog.bookingCode !== 'string') {
      console.error('Invalid bookingCode in confirmCancelBooking:', cancelDialog.bookingCode);
      setSnackbar({
        open: true,
        message: 'Invalid booking code. Please try again.',
        severity: 'error',
      });
      handleCloseCancelDialog();
      return;
    }

    try {
      const url = `${BACKEND_API_URL}/api/bookingHistory/${encodeURIComponent(cancelDialog.bookingCode)}/cancel`;
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking.bookingCode === cancelDialog.bookingCode
            ? { ...booking, status: 'cancelled' }
            : booking
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

  const handleOpenCancelDialog = (bookingCode, bookingName) => {
    if (!bookingCode || typeof bookingCode !== 'string') {
      console.error('Invalid bookingCode in handleOpenCancelDialog:', bookingCode);
      setSnackbar({
        open: true,
        message: 'Invalid booking code. Cannot open cancellation dialog.',
        severity: 'error',
      });
      return;
    }
    setCancelDialog({
      open: true,
      bookingCode,
      bookingName,
    });
  };

  const handleCloseCancelDialog = () => {
    setCancelDialog({
      open: false,
      bookingCode: null,
      bookingName: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isUpcomingBooking = (booking) => {
    return new Date(booking.checkOut) > new Date() && booking.status !== 'cancelled';
  };

  const isCompletedBooking = (booking) => {
    return new Date(booking.checkOut) <= new Date() && booking.status !== 'cancelled';
  };

  const filteredBookings = bookings.filter((booking) => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return isUpcomingBooking(booking);
    if (tabValue === 2) return isCompletedBooking(booking);
    if (tabValue === 3) return booking.status === 'cancelled';
    return true;
  });

  const sortedFilteredBookings = tabValue === 0
    ? filteredBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : filteredBookings;

  const getStatusChip = (booking) => {
    if (booking.status === 'cancelled') {
      return (
        <StatusChip
          icon={<Cancel style={{ color: '#EEEEEE' }} />}
          label="Cancelled"
          sx={{ backgroundColor: '#F44336' }}
        />
      );
    }
    if (isUpcomingBooking(booking)) {
      return (
        <StatusChip
          icon={<AccessTime style={{ color: '#EEEEEE' }} />}
          label="Upcoming"
          sx={{ backgroundColor: '#FFA500' }}
        />
      );
    }
    if (isCompletedBooking(booking)) {
      return (
        <StatusChip
          icon={<CheckCircle style={{ color: '#EEEEEE' }} />}
          label="Completed"
          sx={{ backgroundColor: '#4CAF50' }}
        />
      );
    }
    return (
      <StatusChip
        icon={<AccessTime style={{ color: '#EEEEEE' }} />}
        label={booking.status}
        sx={{ backgroundColor: '#666' }}
      />
    );
  };

  const isUpcomingAndCancelable = (booking) => {
    return isUpcomingBooking(booking);
  };

  if (!authChecked) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#222831',
        }}
      >
        <CircularProgress sx={{ color: '#00ADB5' }} />
      </Box>
    );
  }

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
                badgeContent={bookings.filter(isUpcomingBooking).length}
                color="primary"
              >
                Upcoming
              </Badge>
            }
          />
          <Tab
            label={
              <Badge
                badgeContent={bookings.filter(isCompletedBooking).length}
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
            icon={<Receipt />}
            iconPosition="start"
            label="Request Refund"
            sx={{
              '&.Mui-selected': {
                color: '#00ADB5',
              },
            }}
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
        <AskRefund />
      ) : tabValue === 5 ? (
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
          {sortedFilteredBookings.map((booking) => (
            <Grid item xs={12} key={booking.bookingCode}>
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
                            {getStatusChip(booking)}
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
                              <Typography>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ mr: 1, color: '#00ADB5' }} />
                              <Typography>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</Typography>
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
                              ${booking.totalPrice?.toFixed(2) || '0.00'}
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
                        {isUpcomingAndCancelable(booking) && (
                          <ColorButton
                            variant="contained"
                            startIcon={<Cancel />}
                            onClick={() =>
                              handleOpenCancelDialog(booking.bookingCode, booking.hotelName)
                            }
                            sx={{ mb: 2, width: '100%' }}
                            disabled={!booking.bookingCode}
                          >
                            Cancel Booking
                          </ColorButton>
                        )}
                        {isCompletedBooking(booking) && (
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
                        )}
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