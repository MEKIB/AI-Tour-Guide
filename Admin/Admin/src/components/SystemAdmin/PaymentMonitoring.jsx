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

  // Backend API base URL
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Mock payment data
  useEffect(() => {
    const mockPayments = [
      {
        txRef: 'TX-TGVMSX6KIQY8D8F',
        userName: 'Test User',
        hotel: 'Test Hotel',
        amount: 100,
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
        checkOutDate: 'ස 2025-05-02',
        date: '2025-05-02',
      },
    ];
    setPayments(mockPayments);
  }, []);

  // Filter payments by search query
  const filteredPayments = payments.filter((payment) =>
    payment.txRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open refund confirmation dialog
  const openRefundDialog = (payment) => {
    if (payment.checkInStatus === 'Checked In') {
      setNotification({
        open: true,
        message: 'Cannot refund: This booking is already checked in.',
        severity: 'warning',
      });
      return;
    }
    setPaymentToRefund(payment);
    setRefundDetails({ reason: '', amount: payment.amount.toString() });
    setRefundDialogOpen(true);
  };

  // Close refund confirmation dialog
  const closeRefundDialog = () => {
    setPaymentToRefund(null);
    setRefundDetails({ reason: '', amount: '' });
    setRefundDialogOpen(false);
  };

  // Handle refund detail changes
  const handleRefundDetailChange = (field) => (event) => {
    setRefundDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Process refund
  const processRefund = async () => {
    if (!refundDetails.reason) {
      setNotification({
        open: true,
        message: 'Please provide a reason for the refund.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const refundData = {
        reason: refundDetails.reason,
        amount: refundDetails.amount || undefined, // Omit if empty to refund full amount
        meta: {
          customer_id: paymentToRefund.userName,
          reference: `REF-${paymentToRefund.txRef}`,
        },
      };

      const response = await axios.post(
        `${BACKEND_API_URL}/api/chapa/refund/${paymentToRefund.txRef}`,
        refundData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.txRef === paymentToRefund.txRef
              ? { ...payment, checkInStatus: 'Refunded' }
              : payment
          )
        );
        setNotification({
          open: true,
          message: `Refund processed successfully for ${paymentToRefund.txRef}.`,
          severity: 'success',
        });
      } else {
        throw new Error(response.data.message || 'Refund failed');
      }
    } catch (error) {
      console.error('Refund error:', error.response?.data || error.message);
      setNotification({
        open: true,
        message:
          error.response?.data?.message ||
          'Failed to process refund. Please check your available balance or verify the transaction reference.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      closeRefundDialog();
    }
  };

  // Close notification
  const handleCloseNotification = () => {
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
        placeholder="Search by transaction reference (e.g., APsl2RfSSaNyv)"
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
            helperText={`Leave blank to refund the full amount (${paymentToRefund?.amount} ETB).`}
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