import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Home, Receipt, History } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const ColorButton = styled(Button)({
  backgroundColor: '#00ADB5',
  color: '#EEEEEE',
  '&:hover': {
    backgroundColor: '#008B8B',
  },
});

const AskRefund = () => {
  const [bookingCode, setBookingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [refunds, setRefunds] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [historyTabValue, setHistoryTabValue] = useState(0); // For nested tabs in Refund History
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;
  const isLoggedIn = !!token && !!userId;

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Fetch refunds for Refund History tab
  const fetchRefunds = async () => {
    if (!isLoggedIn) return;

    try {
      const response = await axios.get(`${BACKEND_API_URL}/api/refunds/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Refunds fetched:', JSON.stringify(response.data.data, null, 2));
      setRefunds(response.data.data);
    } catch (err) {
      console.error('Error fetching refunds:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to fetch refunds',
        severity: 'error',
      });
    }
  };

  // Fetch refunds on mount and when switching to Refund History tab
  useEffect(() => {
    if (tabValue === 1) {
      fetchRefunds();
    }
  }, [isLoggedIn, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleHistoryTabChange = (event, newValue) => {
    setHistoryTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setSnackbar({
        open: true,
        message: 'Please log in to request a refund',
        severity: 'error',
      });
      return;
    }

    if (!bookingCode || typeof bookingCode !== 'string') {
      setSnackbar({
        open: true,
        message: 'Please enter a valid booking code',
        severity: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      // Fetch booking details
      const bookingResponse = await axios.get(`${BACKEND_API_URL}/api/booking/${bookingCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const booking = bookingResponse.data.data;

      // Check booking status
      if (booking.status === 'checked-in') {
        setSnackbar({
          open: true,
          message: 'You have already used the booking',
          severity: 'error',
        });
        return;
      }

      // Submit refund request
      const refundResponse = await axios.post(
        `${BACKEND_API_URL}/api/askrefunds`,
        {
          userId,
          bookingCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Refund request response:', JSON.stringify(refundResponse.data, null, 2));

      setSnackbar({
        open: true,
        message: 'Refund request submitted successfully',
        severity: 'success',
      });
      setBookingCode('');
      // Refresh refunds for Refund History tab
      await fetchRefunds();
    } catch (err) {
      console.error('Error processing refund request:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to process refund request. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter and sort refunds for Pending and Refunded tabs
  const filteredRefunds = refunds
    .filter((refund) => (historyTabValue === 0 ? refund.status === 'pending' : refund.status === 'refunded'))
    .sort((a, b) => {
      const dateA = new Date(historyTabValue === 0 ? a.createdAt : a.updatedAt || a.createdAt);
      const dateB = new Date(historyTabValue === 0 ? b.createdAt : b.updatedAt || b.createdAt);
      return historyTabValue === 0 ? dateA - dateB : dateB - dateA; // Oldest first for Pending, Newest first for Refunded
    });

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
        <Link
          component={RouterLink}
          to="/booking-history"
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
          <History sx={{ mr: 0.5 }} fontSize="inherit" />
          Booking History
        </Link>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#EEEEEE',
          }}
        >
          <Receipt sx={{ mr: 0.5 }} fontSize="inherit" />
          Request Refund
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3, color: '#00ADB5', fontWeight: 'bold' }}>
        Refund Management
      </Typography>

      <Paper sx={{ mb: 3, backgroundColor: '#393E46' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': { color: '#EEEEEE' },
            '& .Mui-selected': { color: '#00ADB5' },
            '& .MuiTabs-indicator': { backgroundColor: '#00ADB5' },
          }}
        >
          <Tab label="Request Refund" />
          <Tab label="Refund History" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Card
          sx={{
            backgroundColor: '#393E46',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            maxWidth: 600,
            mx: 'auto',
            mb: 4,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: '#EEEEEE', mb: 2 }}>
              Enter your booking code to request a refund
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Booking Code"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiInputLabel-root': { color: '#EEEEEE' },
                  '& .MuiOutlinedInput-root': {
                    color: '#EEEEEE',
                    '& fieldset': { borderColor: '#00ADB5' },
                    '&:hover fieldset': { borderColor: '#008B8B' },
                    '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
                  },
                }}
                disabled={loading}
              />
              <ColorButton
                type="submit"
                variant="contained"
                disabled={loading || !bookingCode}
                startIcon={loading ? <CircularProgress size={20} sx={{ color: '#EEEEEE' }} /> : <Receipt />}
              >
                {loading ? 'Submitting...' : 'Submit Refund Request'}
              </ColorButton>
            </form>
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2, color: '#00ADB5', fontWeight: 'bold' }}>
            Refund History
          </Typography>
          <Paper sx={{ mb: 3, backgroundColor: '#393E46' }}>
            <Tabs
              value={historyTabValue}
              onChange={handleHistoryTabChange}
              sx={{
                '& .MuiTab-root': { color: '#EEEEEE' },
                '& .Mui-selected': { color: '#00ADB5' },
                '& .MuiTabs-indicator': { backgroundColor: '#00ADB5' },
              }}
            >
              <Tab label="Pending Refunds" />
              <Tab label="Refunded Payments" />
            </Tabs>
          </Paper>
          {filteredRefunds.length === 0 ? (
            <Typography sx={{ color: '#EEEEEE' }}>
              No {historyTabValue === 0 ? 'pending refunds' : 'refunded payments'} found.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: '#393E46', borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Booking Code</TableCell>
                    <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Total Price</TableCell>
                    <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRefunds.map((refund) => (
                    <TableRow key={refund.bookingCode}>
                      <TableCell sx={{ color: '#EEEEEE' }}>{refund.bookingCode}</TableCell>
                      <TableCell sx={{ color: '#EEEEEE' }}>${refund.totalPrice.toFixed(2)}</TableCell>
                      <TableCell sx={{ color: '#EEEEEE' }}>
                        <Typography
                          sx={{
                            color: refund.status === 'pending' ? '#FFA500' : '#4CAF50',
                            textTransform: 'capitalize',
                          }}
                        >
                          {refund.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

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

export default AskRefund;