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
} from '@mui/material';
import { Search, MoneyOff, Close } from '@mui/icons-material';
import axios from 'axios';

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

  // Backend API base URL
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Mock payment data (assumed to contain real txRef values)
  useEffect(() => {
    console.log('Loading mock payment data with real txRef values');
    const mockPayments = [
      {
        txRef: 'TX-YQKA94VT4Q6NR1J',
        userName: 'Test User',
        hotel: 'Test Hotel',
        amount: 90, // Corrected to match verified amount
        checkInStatus: 'Check In',
        checkInDate: '2025-06-01',
        checkOutDate: '2025-06-05',
        date: '2025-05-09',
      },
      {
        txRef: 'TX-XYZ987654321098',
        userName: 'Jane Smith',
        hotel: 'Hotel B',
        amount: 750,
        checkInStatus: 'Checked In',
        checkInDate: '2025-07-10',
        checkOutDate: '2025-07-15',
        date: '2025-05-03',
      },
      {
        txRef: 'TX-DEF456789123456',
        userName: 'Alice Johnson',
        hotel: 'Hotel C',
        amount: 300,
        checkInStatus: 'Checked In',
        checkInDate: '2025-06-15',
        checkOutDate: '2025-06-20',
        date: '2025-05-02',
      },
    ];
    setPayments(mockPayments);
    console.log('Mock payments set:', mockPayments);
  }, []);

  // Filter payments by search query
  const filteredPayments = payments.filter((payment) =>
    payment.txRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        fullTransactionData: verifyResponse.data.data, // Log full transaction data
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
      const transactionReference = verifyResponse.data.data?.reference; // Get reference from full data
      
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

      setTransactionData({
        ...verifyResponse.data.data,
        reference: transactionReference // Store the reference for refund
      });
      setPaymentToRefund(payment);
      setRefundDetails({ 
        reason: '', 
        amount: verifyResponse.data.data.amount.toString() 
      });
      setRefundDialogOpen(true);
      console.log('Refund dialog opened with payment:', payment);
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
          reference: transactionData.reference, // Use the reference from transaction data
        },
      };
      
      console.log('Sending refund request to backend:', {
        url: `${BACKEND_API_URL}/api/chapa/refund/${transactionData.reference}`, // Use reference for the API call
        headers: { 'Content-Type': 'application/json' },
        data: refundData,
      });

      const response = await axios.post(
        `${BACKEND_API_URL}/api/chapa/refund/${transactionData.reference}`, // Use reference for the API call
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
        console.log('Refund successful, updating payment status');
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.txRef === paymentToRefund.txRef
              ? { ...payment, checkInStatus: 'Refunded' }
              : payment
          )
        );
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

      {/* Payments Table */}
      <TableContainer component={Paper} sx={{ background: '#393E46', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Transaction Reference</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>User Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Hotel</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Amount (ETB)</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-In Status</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-In Date</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-Out Date</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Payment Date</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
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
                <TableCell sx={{ color: '#EEEEEE' }}>{payment.checkInDate}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{payment.checkOutDate}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{payment.date}</TableCell>
                <TableCell>
                  {payment.checkInStatus === 'Check In' && (
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
            ))}
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
            label="Refund Amount (Optional)"
            variant="outlined"
            value={refundDetails.amount}
            onChange={handleRefundDetailChange('amount')}
            type="number"
            helperText={`Leave blank to refund the full amount (${transactionData?.amount || paymentToRefund?.amount} ETB).`}
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