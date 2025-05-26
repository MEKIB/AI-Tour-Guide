import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { Search, MoneyOff, Close } from '@mui/icons-material';
import axios from 'axios';

// Utility function to safely format dates
const formatDate = (dateString, fieldName) => {
  try {
    if (!dateString) {
      console.warn(`Missing date for ${fieldName}`);
      return 'Unknown';
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date for ${fieldName}: ${dateString}`);
      return 'Invalid Date';
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error parsing date for ${fieldName}:`, error.message, { dateString });
    return 'Invalid Date';
  }
};

const PaymentMonitoring = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [paymentToRefund, setPaymentToRefund] = useState(null);
  const [refundDetails, setRefundDetails] = useState({
    reason: '',
    amount: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Backend API base URL
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Fetch refund data, user details, and booking status
  useEffect(() => {
    console.log('Fetching refund data from backend');
    const fetchData = async () => {
      try {
        // Fetch refunds
        console.log('Fetching refunds from /api/refunds');
        const refundResponse = await axios.get(`${BACKEND_API_URL}/api/refunds`, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('Refund response:', {
          status: refundResponse.status,
          data: refundResponse.data,
        });

        if (refundResponse.data.message !== 'Refunds retrieved successfully') {
          console.log('Failed to fetch refunds:', refundResponse.data);
          setNotification({
            open: true,
            message: 'Failed to fetch refund data.',
            severity: 'error',
          });
          return;
        }

        const refunds = refundResponse.data.data;

        // Fetch user details and booking status for each refund
        const formattedPayments = await Promise.all(
          refunds.map(async (refund) => {
            // Fetch user details
            console.log(`Fetching user details for userId: ${refund.userId}`);
            let user = null;
            try {
              const userResponse = await axios.get(`${BACKEND_API_URL}/api/systemusers/${refund.userId}`, {
                headers: { 'Content-Type': 'application/json' },
              });
              console.log(`User response for ${refund.userId}:`, {
                status: userResponse.status,
                data: userResponse.data,
              });
              if (userResponse.data.message === 'User retrieved successfully') {
                user = userResponse.data.data;
              }
            } catch (error) {
              console.error(`Error fetching user ${refund.userId}:`, error.response?.data || error.message);
            }

            // Fetch booking status
            console.log(`Fetching booking status for bookingCode: ${refund.bookingCode}`);
            let booking = null;
            try {
              const bookingResponse = await axios.get(
                `${BACKEND_API_URL}/api/systembookings/code/${refund.bookingCode}`,
                {
                  headers: { 'Content-Type': 'application/json' },
                }
              );
              console.log(`Booking response for ${refund.bookingCode}:`, {
                status: bookingResponse.status,
                data: bookingResponse.data,
              });
              if (bookingResponse.data.message === 'Booking retrieved successfully') {
                booking = bookingResponse.data.data;
              }
            } catch (error) {
              console.error(`Error fetching booking ${refund.bookingCode}:`, error.response?.data || error.message);
            }

            return {
              txRef: refund.bookingCode,
              userName: user
                ? `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim()
                : 'Unknown User',
              hotel: booking?.hotelName || 'Unknown Hotel',
              amount: refund.totalPrice,
              checkInStatus: booking?.status || 'Unknown',
              checkInDate: formatDate(refund.checkInDate, `checkInDate for ${refund.bookingCode}`),
              checkOutDate: formatDate(refund.checkOutDate, `checkOutDate for ${refund.bookingCode}`),
              date: formatDate(booking?.createdAt, `createdAt for booking ${refund.bookingCode}`),
              refundStatus: refund.status,
              refundCreatedAt: refund.createdAt, // Store for sorting
            };
          })
        );

        // Filter out any payments with invalid dates to prevent rendering issues
        const validPayments = formattedPayments.filter(
          (payment) =>
            payment.checkInDate !== 'Invalid Date' &&
            payment.checkOutDate !== 'Invalid Date' &&
            payment.date !== 'Invalid Date'
        );

        setPayments(validPayments);
        console.log('Payments set:', validPayments);

        if (validPayments.length < formattedPayments.length) {
          setNotification({
            open: true,
            message: 'Some records were skipped due to invalid dates.',
            severity: 'warning',
          });
        }
      } catch (error) {
        console.error('Error fetching data:', {
          status: error.response?.status,
          data: error.response?.data || error.message,
        });
        setNotification({
          open: true,
          message: 'Failed to fetch data. Please try again.',
          severity: 'error',
        });
      }
    };

    fetchData();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter and sort payments by search query and tab
  const filteredPayments = payments
    .filter((payment) =>
      payment.txRef.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((payment) =>
      tabValue === 0
        ? payment.refundStatus === 'pending'
        : payment.refundStatus === 'refunded'
    )
    .sort((a, b) => {
      const dateA = new Date(a.refundCreatedAt);
      const dateB = new Date(b.refundCreatedAt);
      return tabValue === 0 ? dateA - dateB : dateB - dateA; // Oldest first for Pending, Newest first for Refunded
    });

  // Open refund confirmation dialog
  const openRefundDialog = async (payment) => {
    console.log('Attempting to open refund dialog for payment:', payment);
    if (payment.checkInStatus === 'Checked In') {
      console.log('Refund blocked: Payment is already checked in');
      setNotification({
        open: true,
        message: 'Cannot refund: This booking is already checked in.',
        severity: 'warning',
      });
      return;
    }

    // Verify transaction before opening dialog
    console.log('Verifying transaction:', payment.txRef);
    try {
      const verifyResponse = await axios.get(
        `${BACKEND_API_URL}/api/chapa/verify/${payment.txRef}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Verification response:', {
        status: verifyResponse.status,
        data: verifyResponse.data,
        fullTransactionData: verifyResponse.data.data,
      });
      
      if (verifyResponse.data.status !== 'success') {
        console.log('Transaction verification failed:', verifyResponse.data);
        setNotification({
          open: true,
          message: 'Cannot refund: Transaction not found or invalid.',
          severity: 'error',
        });
        return;
      }

      // Check transaction status and get the reference from full data
      const transactionStatus = verifyResponse.data.data?.status || 'unknown';
      const refundStatus = verifyResponse.data.data?.refund_status || 'none';
      const transactionReference = verifyResponse.data.data?.reference;
      
      console.log('Transaction details:', {
        status: transactionStatus,
        refundStatus: refundStatus,
        amount: verifyResponse.data.data?.amount,
        reference: transactionReference,
        fullData: verifyResponse.data.data,
      });
      
      if (transactionStatus !== 'success' && transactionStatus !== 'completed') {
        console.log('Refund blocked: Transaction status is not refundable:', transactionStatus);
        setNotification({
          open: true,
          message: `Cannot refund: Transaction status is ${transactionStatus}.`,
          severity: 'error',
        });
        return;
      }
      
      if (refundStatus === 'refunded' || refundStatus === 'partially_refunded') {
        console.log('Refund blocked: Transaction already refunded:', refundStatus);
        setNotification({
          open: true,
          message: `Cannot refund: Transaction is already ${refundStatus}.`,
          severity: 'error',
        });
        return;
      }

      if (!transactionReference) {
        console.log('Refund blocked: No reference found in transaction data');
        setNotification({
          open: true,
          message: 'Cannot refund: No valid reference found in transaction data.',
          severity: 'error',
        });
        return;
      }

      // Calculate default refund amount as totalPrice minus 2.5% fee
      const originalAmount = verifyResponse.data.data.amount;
      const defaultRefundAmount = (originalAmount * 0.975).toFixed(2); // 97.5% of original amount

      setTransactionData({
        ...verifyResponse.data.data,
        reference: transactionReference
      });
      setPaymentToRefund(payment);
      setRefundDetails({ 
        reason: '', 
        amount: defaultRefundAmount.toString() 
      });
      setRefundDialogOpen(true);
      console.log('Refund dialog opened with payment:', payment, { defaultRefundAmount });
    } catch (error) {
      console.error('Verification error:', {
        status: error.response?.status,
        data: error.response?.data || error.message,
      });
      setNotification({
        open: true,
        message:
          error.response?.data?.message ||
          'Failed to verify transaction. Please check the transaction reference in the Chapa dashboard.',
        severity: 'error',
      });
    }
  };

  // Close refund confirmation dialog
  const closeRefundDialog = () => {
    console.log('Closing refund dialog');
    setPaymentToRefund(null);
    setRefundDetails({ reason: '', amount: '' });
    setTransactionData(null);
    setRefundDialogOpen(false);
  };

  // Handle refund detail changes
  const handleRefundDetailChange = (field) => (event) => {
    console.log(`Updating refund detail - ${field}:`, event.target.value);
    setRefundDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Process refund using the reference from transaction data
  const processRefund = async () => {
    if (!refundDetails.reason) {
      console.log('Refund blocked: No reason provided');
      setNotification({
        open: true,
        message: 'Please provide a reason for the refund.',
        severity: 'error',
      });
      return;
    }

    console.log('Initiating refund process for reference:', transactionData?.reference);
    setLoading(true);
    try {
      // Validate refund amount against transaction amount
      const transactionAmount = transactionData?.amount ? Number(transactionData.amount) : paymentToRefund.amount;
      const refundAmount = refundDetails.amount ? Number(refundDetails.amount) : transactionAmount;
      console.log('Validating refund amount:', { transactionAmount, refundAmount });
      
      if (refundAmount > transactionAmount) {
        console.log('Refund blocked: Refund amount exceeds transaction amount');
        throw new Error('Refund amount cannot exceed the original transaction amount');
      }

      const refundData = {
        reason: refundDetails.reason,
        amount: refundDetails.amount ? Number(refundDetails.amount) : undefined,
        meta: {
          customer_id: paymentToRefund.userName,
          reference: transactionData.reference,
        },
      };
      
      console.log('Sending refund request to backend:', {
        url: `${BACKEND_API_URL}/api/chapa/refund/${transactionData.reference}`,
        headers: { 'Content-Type': 'application/json' },
        data: refundData,
      });

      const response = await axios.post(
        `${BACKEND_API_URL}/api/chapa/refund/${transactionData.reference}`,
        refundData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('Refund response from backend:', {
        status: response.status,
        data: response.data,
      });

      if (response.data.status === 'success') {
        console.log('Refund successful, updating refund status');
        // Call the new refund update API with bookingCode
        try {
          console.log('Sending refund update request:', {
            url: `${BACKEND_API_URL}/api/refunds/update/${paymentToRefund.txRef}`,
            headers: { 'Content-Type': 'application/json' },
          });
          const updateResponse = await axios.put(
            `${BACKEND_API_URL}/api/refunds/update/${paymentToRefund.txRef}`,
            {},
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          console.log('Refund update response:', {
            status: updateResponse.status,
            data: updateResponse.data,
          });

          if (updateResponse.data.message !== 'Refund status updated successfully') {
            console.warn('Failed to update refund status:', updateResponse.data);
            throw new Error('Failed to update refund status in database');
          }
        } catch (updateError) {
          console.error('Refund update error:', {
            status: updateError.response?.status,
            data: updateError.response?.data || updateError.message,
          });
          throw new Error(updateError.response?.data?.message || 'Failed to update refund status');
        }

        // Update frontend state
        // setPayments((prevPayments) =>
        //   prevPayments.map((payment) =>
        //     payment.txRef === paymentToRefund.txRef
        //       ? { ...payment, checkInStatus: 'Refunded', refundStatus: 'refunded' }
        //       : payment
        //   )
        // );
        setNotification({
          open: true,
          message: `Refund processed successfully for ${transactionData.reference}.`,
          severity: 'success',
        });
      } else {
        console.log('Refund failed with response:', response.data);
        throw new Error(response.data.message || 'Refund failed');
      }
    } catch (error) {
      console.error('Refund error:', {
        status: error.response?.status,
        data: error.response?.data || error.message,
      });
      setNotification({
        open: true,
        message:
          error.message === 'Refund amount cannot exceed the original transaction amount'
            ? 'Refund amount exceeds original transaction amount.'
            : error.message.includes('Failed to update refund status')
            ? 'Refund processed, but failed to update refund status in database.'
            : error.response?.data?.message.includes('Transaction not found')
            ? 'Failed to process refund: Transaction not found. Please check the transaction status in the Chapa dashboard or contact Chapa support.'
            : error.response?.data?.message || 'Failed to process refund. Please verify the transaction reference or contact Chapa support.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      console.log('Refund process completed, closing dialog');
      closeRefundDialog();
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    console.log('Closing notification');
    setNotification((prev) => ({ ...prev, open: false }));
  };

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
        Payment Monitoring
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search by transaction reference (e.g., TX-ZC2R4K48IN33MIZ)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ color: '#00ADB5', mr: 1 }} />,
        }}
        sx={{
          mb: 3,
          background: '#393E46',
          borderRadius: 1,
          '& .MuiInputBase-input': { color: '#EEEEEE' },
          '& .MuiInputLabel-root': { color: '#EEEEEE' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
          },
        }}
      />

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          mb: 3,
          '& .MuiTabs-indicator': { backgroundColor: '#00ADB5' },
          '& .MuiTab-root': { color: '#EEEEEE', fontWeight: 'bold' },
          '& .Mui-selected': { color: '#00ADB5' },
        }}
      >
        <Tab label="Pending Refunds" />
        <Tab label="Refunded Payments" />
      </Tabs>

      {/* Payments Table */}
      <TableContainer component={Paper} sx={{ background: '#393E46', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Transaction Reference</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>User Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Hotel</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Amount (ETB)</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Booking Status</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Refund Status</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-In Date</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-Out Date</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Payment Date</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow key={payment.txRef}>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.txRef}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.userName}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.hotel}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.amount}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        payment.checkInStatus === 'Checked In'
                          ? '#00ADB5'
                          : payment.checkInStatus === 'Refunded'
                          ? '#ff6b6b'
                          : '#F37199',
                      fontWeight: 'bold',
                    }}
                  >
                    {payment.checkInStatus}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: payment.refundStatus === 'refunded' ? '#ff6b6b' : '#F37199',
                      fontWeight: 'bold',
                    }}
                  >
                    {payment.refundStatus}
                  </TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.checkInDate}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.checkOutDate}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{payment.date}</TableCell>
                  <TableCell>
                    {payment.refundStatus === 'pending' && (
                      <Button
                        variant="contained"
                        onClick={() => openRefundDialog(payment)}
                        startIcon={<MoneyOff />}
                        sx={{
                          bgcolor: '#00ADB5',
                          color: '#EEEEEE',
                          '&:hover': { bgcolor: '#0097A7' },
                        }}
                      >
                        Refund
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} sx={{ color: '#EEEEEE', textAlign: 'center' }}>
                  No {tabValue === 0 ? 'pending refunds' : 'refunded payments'} found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Refund Confirmation Dialog */}
      <Dialog
        open={refundDialogOpen}
        onClose={closeRefundDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#393E46', borderRadius: 2 },
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
            Confirm Refund
          </Typography>
          <Button
            onClick={closeRefundDialog}
            sx={{
              minWidth: 0,
              color: '#EEEEEE',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#393E46', color: '#EEEEEE', py: 2 }}>
          <Typography sx={{ mb: 2 }}>
            Refunding payment for {paymentToRefund?.txRef}. Please provide refund details.
          </Typography>
          <TextField
            fullWidth
            label="Reason for Refund"
            variant="outlined"
            value={refundDetails.reason}
            onChange={handleRefundDetailChange('reason')}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00ADB5' },
                '&:hover fieldset': { borderColor: '#00ADB5' },
                '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
              },
              '& .MuiInputLabel-root': { color: '#EEEEEE' },
              '& .MuiInputBase-input': { color: '#EEEEEE' },
            }}
          />
          <TextField
            fullWidth
            label="Refund Amount (ETB)"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={refundDetails.amount}
            type="number"
            helperText={`The refund is 97.5% of the original amount (${transactionData?.amount || paymentToRefund?.amount} ETB) due to a 2.5% Chapa fee.`}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00ADB5' },
                '&:hover fieldset': { borderColor: '#00ADB5' },
                '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
              },
              '& .MuiInputLabel-root': { color: '#EEEEEE' },
              '& .MuiInputBase-input': { color: '#EEEEEE' },
              '& .MuiFormHelperText-root': { color: '#EEEEEE' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#393E46', py: 1.5 }}>
          <Button
            onClick={closeRefundDialog}
            sx={{
              border: '1px solid #00ADB5',
              color: '#00ADB5',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(0, 173, 181, 0.1)' },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={processRefund}
            disabled={loading || !refundDetails.reason}
            sx={{
              backgroundColor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#0097A7' },
            }}
          >
            {loading ? 'Processing...' : 'Refund'}
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

export default PaymentMonitoring;