import React, { useState, Fragment, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  Grid,
  Radio,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  CircularProgress,
  Fade,
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import Telebirr from '../../assets/logo/TeleBirr.png';
import Chapa from '../../assets/logo/Chapa.png';
import Cbebirr from '../../assets/logo/CBEBirr.png';
import { styled, keyframes } from '@mui/system';

// Animation for the success popup
const scaleIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled components for the success dialog
const SuccessDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(135deg, #00ADB5 0%, #4ECDC4 100%)',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    animation: `${scaleIn} 0.5s ease forwards`,
    overflow: 'hidden',
  },
}));

const PaymentModal = ({ open, onClose, bookingDetails, onPaymentSuccess }) => {
  // State to hold user data from localStorage
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      setUserDetails({
        email: storedUser.email || '',
        firstName: storedUser.firstName || '',
        middleName: storedUser.middleName || '',
        phone: storedUser.phone || '',
      });
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState('chapa');
  const [selectedChapaOption, setSelectedChapaOption] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    name: userDetails ? `${userDetails.firstName} ${userDetails.middleName}`.trim() : '',
    email: userDetails ? userDetails.email : '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [mobilePaymentDetails, setMobilePaymentDetails] = useState({
    phoneNumber: userDetails ? userDetails.phone : '',
    fullName: userDetails ? `${userDetails.firstName} ${userDetails.middleName}`.trim() : '',
  });
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update state when userDetails changes
  useEffect(() => {
    if (userDetails) {
      setCardDetails((prev) => ({
        ...prev,
        name: `${userDetails.firstName} ${userDetails.middleName}`.trim(),
        email: userDetails.email,
      }));
      setMobilePaymentDetails((prev) => ({
        ...prev,
        phoneNumber: userDetails.phone,
        fullName: `${userDetails.firstName} ${userDetails.middleName}`.trim(),
      }));
    }
  }, [userDetails]);

  // Chapa test mode credentials
  const TEST_PHONE_NUMBER = '0912345678';
  const TEST_CARD_NUMBER = '4242424242424242';
  const TEST_EXPIRY = '12/25';
  const TEST_CVV = '123';

  // URLs for testing
  const CALLBACK_URL = 'https://708b-2a09-bac1-2400-8-00-58-73.ngrok-free.app/webhook/chapa';
  const RETURN_URL = 'https://708b-2a09-bac1-2400-8-00-58-73.ngrok-free.app/payment-complete';

  // Backend API base URL
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

  // Utility function to generate transaction reference
  const generateTxRef = (options = {}) => {
    const { prefix = 'TX', size = 15, removePrefix = false } = options;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return removePrefix ? result : `${prefix}-${result}`;
  };

  // Validation functions
  const validatePhoneNumber = (phone) => {
    const ethiopianPhoneRegex = /^09\d{8}$/;
    return ethiopianPhoneRegex.test(phone);
  };

  const validateCardNumber = (number) => {
    const cardRegex = /^\d{16}$/;
    return cardRegex.test(number);
  };

  const validateExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return expiryRegex.test(expiry);
  };

  const validateCVV = (cvv) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setSelectedChapaOption(null);
    setMobilePaymentDetails({
      phoneNumber: userDetails ? userDetails.phone : TEST_PHONE_NUMBER,
      fullName: userDetails ? `${userDetails.firstName} ${userDetails.middleName}`.trim() : 'Test User',
    });
    setCardDetails({
      name: userDetails ? `${userDetails.firstName} ${userDetails.middleName}`.trim() : '',
      email: userDetails ? userDetails.email : '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    });
  };

  const handleChapaOptionChange = (option) => {
    setSelectedChapaOption(option);
    setMobilePaymentDetails({
      phoneNumber: userDetails ? userDetails.phone : TEST_PHONE_NUMBER,
      fullName: userDetails ? `${userDetails.firstName} ${userDetails.middleName}`.trim() : 'Test User',
    });
  };

  const handleCardDetailChange = (field) => (event) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleMobilePaymentChange = (field) => (event) => {
    setMobilePaymentDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const showErrorNotification = (message) => {
    setSuccessMessage(message);
    setSuccessOpen(true);
  };

  const showSuccessNotification = (message) => {
    setSuccessMessage(message);
    setSuccessOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
  };

  const verifyTransaction = async (tx_ref) => {
    try {
      const verifyResponse = await axios.get(
        `${BACKEND_API_URL}/api/chapa/verify/${tx_ref}`
      );
      return verifyResponse.data;
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  };

  const createBookingHistory = async (tx_ref) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id;

      if (!userId) {
        throw new Error("User ID not found");
      }

      if (!bookingDetails.hotelAdminId) {
        throw new Error("Hotel Admin ID not provided");
      }

      const bookingHistoryData = {
        userId,
        hotelAdminId: bookingDetails.hotelAdminId, // e.g., "102"
        hotelName: bookingDetails.hotelName, // e.g., "Unison Hotel"
        roomType: bookingDetails.roomType,
        roomNumber: bookingDetails.roomNumbers[0], // Assuming single room
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        totalPrice: parseFloat(bookingDetails.totalPrice.replace(/,/g, "")),
        image: bookingDetails.image || "https://via.placeholder.com/500x180?text=No+Image",
        guests: bookingDetails.numberOfRooms || 1,
        tx_ref,
      };

      const response = await axios.post(
        `${BACKEND_API_URL}/api/bookingHistory/create`,
        bookingHistoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking history created:", response.data);
      // Update success message to inform user about email
      showSuccessNotification(
        `Payment Successful! A confirmation email has been sent to ${user.email}.`
      );
      // Call onPaymentSuccess after successful booking history creation
      if (bookingDetails.reservationId && bookingDetails.title) {
        onPaymentSuccess(bookingDetails.reservationId, bookingDetails.title);
      }
    } catch (error) {
      console.error("Error creating booking history:", error);
      showErrorNotification(
        error.response?.data?.message || "Failed to save booking history"
      );
    }
  };

  const handlePay = async () => {
    // Input validation
    if (paymentMethod === 'chapa') {
      if (!selectedChapaOption) {
        showErrorNotification('Please select a payment option');
        return;
      }
      if (!mobilePaymentDetails.phoneNumber || !mobilePaymentDetails.fullName) {
        showErrorNotification('Please fill all required fields for mobile payment');
        return;
      }
      if (!validatePhoneNumber(mobilePaymentDetails.phoneNumber)) {
        showErrorNotification('Please enter a valid Ethiopian phone number (09XXXXXXXX)');
        return;
      }
    }
    if (paymentMethod === 'mastercard') {
      if (
        !cardDetails.name ||
        !cardDetails.email ||
        !cardDetails.cardNumber ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        showErrorNotification('Please fill all card details');
        return;
      }
      if (!validateEmail(cardDetails.email)) {
        showErrorNotification('Please enter a valid email address');
        return;
      }
      if (!validateCardNumber(cardDetails.cardNumber)) {
        showErrorNotification('Please enter a valid 16-digit card number');
        return;
      }
      if (!validateExpiry(cardDetails.expiry)) {
        showErrorNotification('Please enter a valid expiry date (MM/YY)');
        return;
      }
      if (!validateCVV(cardDetails.cvv)) {
        showErrorNotification('Please enter a valid CVV (3 or 4 digits)');
        return;
      }
    }

    setLoading(true);

    try {
      let tx_ref;
      if (paymentMethod === 'chapa') {
        tx_ref = generateTxRef();
        const [first_name, ...last_name_parts] = mobilePaymentDetails.fullName.split(' ');
        const last_name = last_name_parts.join(' ') || 'User';

        const etbAmount = '100.00'; // Hardcode test amount

        // Parse the totalPrice to remove commas and ensure numeric format
        const parsedAmount = userDetails
          ? parseFloat(bookingDetails.totalPrice.replace(/,/g, '')).toFixed(2)
          : etbAmount;

        const initData = {
          amount: parsedAmount,
          currency: 'ETB',
          email: userDetails ? userDetails.email : `test+${tx_ref}@gmail.com`,
          first_name,
          last_name,
          phone_number: mobilePaymentDetails.phoneNumber,
          tx_ref,
          callback_url: CALLBACK_URL,
          return_url: `${RETURN_URL}?tx_ref=${tx_ref}`,
          customization: {
            title: 'VISIT AMHARA',
            description: `Booking for ${bookingDetails.roomType}`,
          },
        };

        console.log('Sending request to backend with data:', initData);
        const initResponse = await axios.post(
          `${BACKEND_API_URL}/api/chapa/initialize`,
          initData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Initialization response:', initResponse.data);

        if (initResponse.data.status !== 'success') {
          throw new Error(initResponse.data.message || 'Failed to initialize transaction');
        }

        const checkoutUrl = initResponse.data.data.checkout_url;
        console.log('Opening Chapa checkout URL:', checkoutUrl);
        window.open(checkoutUrl, '_blank');

        // Poll for transaction verification
        let attempts = 0;
        const maxAttempts = 30;
        const pollInterval = setInterval(async () => {
          attempts++;
          try {
            const verifyResponse = await verifyTransaction(tx_ref);
            if (verifyResponse.data.status === 'success') {
              clearInterval(pollInterval);
              setLoading(false);
              showSuccessNotification(
                `Test Payment Successful: ${verifyResponse.data.currency} ${verifyResponse.data.amount} paid, Transaction: ${tx_ref}`
              );

              // Create booking history with tx_ref and delete reservation
              await createBookingHistory(tx_ref);

              setTimeout(() => {
                setSuccessOpen(false);
                onClose();
              }, 3000);
            } else if (verifyResponse.data.status === 'pending') {
              if (attempts >= maxAttempts) {
                clearInterval(pollInterval);
                setLoading(false);
                showErrorNotification('Payment is still pending. Please check back later.');
              }
            } else {
              clearInterval(pollInterval);
              setLoading(false);
              showErrorNotification(`Payment failed: ${verifyResponse.data.status}`);
            }
          } catch (error) {
            if (attempts >= maxAttempts) {
              clearInterval(pollInterval);
              setLoading(false);
              showErrorNotification('Payment verification timed out.');
            }
          }
        }, 10000);
      } else {
        tx_ref = generateTxRef();
        console.log('Test Mastercard payment initiated');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        showSuccessNotification(
          `Test Payment Successful: USD ${bookingDetails.totalPrice} paid, Transaction: ${tx_ref}`
        );

        // Create booking history with tx_ref and delete reservation
        await createBookingHistory(tx_ref);

        window.location.href = `${RETURN_URL}?tx_ref=${tx_ref}`;
        setTimeout(() => {
          setSuccessOpen(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Payment error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      let errorMessage = 'Payment processing failed';
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === 'object') {
          const validationErrors = Object.entries(errorData.message)
            .map(([key, messages]) => `${key}: ${messages.join(', ')}`)
            .join('; ');
          errorMessage = validationErrors || `Error ${error.response.status}: ${error.message}`;
        } else {
          errorMessage = errorData.message || `Error ${error.response.status}: ${error.message}`;
        }
      } else if (error.request) {
        errorMessage = 'No response received from server';
      }
      setLoading(false);
      showErrorNotification(errorMessage);
      if (paymentMethod === 'mastercard') {
        const tx_ref = generateTxRef();
        window.location.href = `${RETURN_URL}?tx_ref=${tx_ref}`;
      }
    }
  };

  if (!bookingDetails) return null;

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        sx={{
          '& .MuiPaper-root': {
            background: 'linear-gradient(135deg, #222831 0%, #393E46 100%)',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: 'transparent',
            color: '#EEEEEE',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 2,
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        >
          Complete Your Booking
          <IconButton
            onClick={onClose}
            sx={{
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'transparent', color: '#EEEEEE', py: 3 }}>
          <Box sx={{ mb: 2, p: 1, background: 'linear-gradient(45deg, #00ADB5 30%, #4ECDC4 90%)', borderRadius: 1 }}>
            <Typography sx={{ color: '#FFFFFF', fontSize: '0.9rem', textAlign: 'center' }}>
              You're in test mode. Transactions will appear on the Chapa dashboard but won't process real payments.
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#00ADB5', mb: 1, fontWeight: 'bold' }}>
              Booking Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>Hotel Name:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#EEEEEE' }}>
                  {bookingDetails.hotelName} {/* e.g., "Unison Hotel" */}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>Room Type:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#EEEEEE' }}>
                  {bookingDetails.roomType}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>Room Number:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#EEEEEE' }}>
                  {bookingDetails.roomNumbers?.join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>Number of Rooms:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#EEEEEE' }}>
                  {bookingDetails.numberOfRooms}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>Check-in Date:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#EEEEEE' }}>
                  {bookingDetails.checkInDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>Check-out Date:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#EEEEEE' }}>
                  {bookingDetails.checkOutDate}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2, backgroundColor: '#00ADB5', opacity: 0.5 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ textAlign: 'right', color: '#00ADB5', fontWeight: 'bold' }}>
                  Total: ETB {bookingDetails.totalPrice}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2, fontWeight: 'bold' }}>
              Payment Method
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  onClick={() => setPaymentMethod('chapa')}
                  sx={{
                    border: '1px solid #393E46',
                    borderRadius: 1,
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'chapa' ? 'rgba(0, 173, 181, 0.2)' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 173, 181, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 173, 181, 0.2)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio checked={paymentMethod === 'chapa'} sx={{ color: '#00ADB5' }} />
                    <Avatar src={Chapa} sx={{ width: 40, height: 40, mr: 1 }} />
                    <Typography sx={{ color: '#EEEEEE' }}>Chapa</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  onClick={() => setPaymentMethod('mastercard')}
                  sx={{
                    border: '1px solid #393E46',
                    borderRadius: 1,
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'mastercard' ? 'rgba(0, 173, 181, 0.2)' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 173, 181, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 173, 181, 0.2)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio checked={paymentMethod === 'mastercard'} sx={{ color: '#00ADB5' }} />
                    <Avatar
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                      sx={{ width: 40, height: 40, mr: 1 }}
                    />
                    <Typography sx={{ color: '#EEEEEE' }}>Mastercard</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {paymentMethod === 'chapa' && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 173, 181, 0.1)', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ mb: 2, color: '#EEEEEE' }}>
                  Select payment option:
                </Typography>
                <List>
                  <ListItem
                    button
                    onClick={() => handleChapaOptionChange('telebirr')}
                    sx={{
                      backgroundColor:
                        selectedChapaOption === 'telebirr' ? 'rgba(0, 173, 181, 0.3)' : 'transparent',
                      borderRadius: 1,
                      mb: 1,
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 173, 181, 0.15)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={Telebirr} sx={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Telebirr" sx={{ color: '#EEEEEE' }} />
                    {selectedChapaOption === 'telebirr' && <Radio checked sx={{ color: '#00ADB5' }} />}
                  </ListItem>

                  {selectedChapaOption === 'telebirr' && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        value={mobilePaymentDetails.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobilePaymentDetails((prev) => ({
                            ...prev,
                            phoneNumber: value,
                          }));
                        }}
                        placeholder="09XXXXXXXX"
                        error={
                          mobilePaymentDetails.phoneNumber &&
                          !validatePhoneNumber(mobilePaymentDetails.phoneNumber)
                        }
                        helperText={
                          mobilePaymentDetails.phoneNumber &&
                          !validatePhoneNumber(mobilePaymentDetails.phoneNumber)
                            ? 'Please enter a valid Ethiopian phone number (09XXXXXXXX)'
                            : ''
                        }
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#393E46',
                            },
                            '&:hover fieldset': {
                              borderColor: '#00ADB5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADB5',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ff6b6b',
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        value={mobilePaymentDetails.fullName}
                        InputProps={{ readOnly: true }}
                        onChange={handleMobilePaymentChange('fullName')}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#393E46',
                            },
                            '&:hover fieldset': {
                              borderColor: '#00ADB5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADB5',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          },
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePay}
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(45deg, #00ADB5 30%, #4ECDC4 90%)',
                          color: '#FFFFFF',
                          py: 1.5,
                          borderRadius: '10px',
                          boxShadow: '0 2px 8px rgba(0, 173, 181, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #008B8B 30%, #3BB2A9 90%)',
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                        ) : (
                          'Test Telebirr Payment'
                        )}
                      </Button>
                    </Box>
                  )}

                  <ListItem
                    button
                    onClick={() => handleChapaOptionChange('cbe')}
                    sx={{
                      backgroundColor:
                        selectedChapaOption === 'cbe' ? 'rgba(0, 173, 181, 0.3)' : 'transparent',
                      borderRadius: 1,
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 173, 181, 0.15)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={Cbebirr} sx={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="CBE Birr" sx={{ color: '#EEEEEE' }} />
                    {selectedChapaOption === 'cbe' && <Radio checked sx={{ color: '#00ADB5' }} />}
                  </ListItem>

                  {selectedChapaOption === 'cbe' && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        value={mobilePaymentDetails.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobilePaymentDetails((prev) => ({
                            ...prev,
                            phoneNumber: value,
                          }));
                        }}
                        placeholder="09XXXXXXXX"
                        error={
                          mobilePaymentDetails.phoneNumber &&
                          !validatePhoneNumber(mobilePaymentDetails.phoneNumber)
                        }
                        helperText={
                          mobilePaymentDetails.phoneNumber &&
                          !validatePhoneNumber(mobilePaymentDetails.phoneNumber)
                            ? 'Please enter a valid Ethiopian phone number (09XXXXXXXX)'
                            : ''
                        }
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#393E46',
                            },
                            '&:hover fieldset': {
                              borderColor: '#00ADB5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADB5',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ff6b6b',
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        value={mobilePaymentDetails.fullName}
                        InputProps={{ readOnly: true }}
                        onChange={handleMobilePaymentChange('fullName')}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#393E46',
                            },
                            '&:hover fieldset': {
                              borderColor: '#00ADB5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADB5',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          },
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePay}
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(45deg, #00ADB5 30%, #4ECDC4 90%)',
                          color: '#FFFFFF',
                          py: 1.5,
                          borderRadius: '10px',
                          boxShadow: '0 2px 8px rgba(0, 173, 181, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #008B8B 30%, #3BB2A9 90%)',
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                        ) : (
                          'Test CBE Birr Payment'
                        )}
                      </Button>
                    </Box>
                  )}
                </List>
              </Box>
            )}

            {paymentMethod === 'mastercard' && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 173, 181, 0.1)', borderRadius: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setCardDetails({
                      name: userDetails ? `${userDetails.firstName} ${userDetails.middleName}`.trim() : 'Test User',
                      email: userDetails ? userDetails.email : `test+${generateTxRef()}@example.com`,
                      cardNumber: TEST_CARD_NUMBER,
                      expiry: TEST_EXPIRY,
                      cvv: TEST_CVV,
                    });
                  }}
                  sx={{
                    mb: 2,
                    color: '#00ADB5',
                    borderColor: '#00ADB5',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 173, 181, 0.05)',
                      boxShadow: '0 2px 8px rgba(0, 173, 181, 0.2)',
                    },
                  }}
                >
                  Fill Test Card Data
                </Button>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      variant="outlined"
                      value={cardDetails.name}
                      onChange={handleCardDetailChange('name')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00ADB5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ADB5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={cardDetails.email}
                      onChange={handleCardDetailChange('email')}
                      error={cardDetails.email && !validateEmail(cardDetails.email)}
                      helperText={
                        cardDetails.email && !validateEmail(cardDetails.email)
                          ? 'Please enter a valid email address'
                          : ''
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00ADB5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ADB5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        },
                        '& .MuiFormHelperText-root': {
                          color: '#ff6b6b',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      variant="outlined"
                      value={cardDetails.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardDetails((prev) => ({
                          ...prev,
                          cardNumber: value,
                        }));
                      }}
                      error={cardDetails.cardNumber && !validateCardNumber(cardDetails.cardNumber)}
                      helperText={
                        cardDetails.cardNumber && !validateCardNumber(cardDetails.cardNumber)
                          ? 'Please enter a valid 16-digit card number'
                          : ''
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00ADB5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ADB5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        },
                        '& .MuiFormHelperText-root': {
                          color: '#ff6b6b',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      variant="outlined"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length > 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setCardDetails((prev) => ({
                          ...prev,
                          expiry: value,
                        }));
                      }}
                      error={cardDetails.expiry && !validateExpiry(cardDetails.expiry)}
                      helperText={
                        cardDetails.expiry && !validateExpiry(cardDetails.expiry)
                          ? 'Please enter a valid expiry date (MM/YY)'
                          : ''
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00ADB5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ADB5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        },
                        '& .MuiFormHelperText-root': {
                          color: '#ff6b6b',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      variant="outlined"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setCardDetails((prev) => ({
                          ...prev,
                          cvv: value,
                        }));
                      }}
                      error={cardDetails.cvv && !validateCVV(cardDetails.cvv)}
                      helperText={
                        cardDetails.cvv && !validateCVV(cardDetails.cvv)
                          ? 'Please enter a valid CVV (3 or 4 digits)'
                          : ''
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00ADB5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ADB5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        },
                        '& .MuiFormHelperText-root': {
                          color: '#ff6b6b',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handlePay}
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(45deg, #00ADB5 30%, #4ECDC4 90%)',
                        color: '#FFFFFF',
                        py: 1.5,
                        mt: 1,
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 173, 181, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #008B8B 30%, #3BB2A9 90%)',
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                      ) : (
                        'Test Mastercard Payment'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Chip
              label="Secure Payment"
              size="small"
              sx={{
                background: 'linear-gradient(45deg, #00ADB5 30%, #4ECDC4 90%)',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                mt: 2,
                boxShadow: '0 2px 8px rgba(0, 173, 181, 0.3)',
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'transparent', py: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#EEEEEE',
              border: '1px solid #00ADB5',
              borderRadius: '10px',
              px: 3,
              '&:hover': {
                backgroundColor: 'rgba(0, 173, 181, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <SuccessDialog
        open={successOpen}
        onClose={handleCloseSuccess}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: '#FFFFFF', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            {successMessage.includes('Success') ? 'Payment Successful!' : 'Notification'}
          </Typography>
          <Typography sx={{ color: '#FFFFFF', mb: 3 }}>
            {successMessage}
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseSuccess}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#00ADB5',
              borderRadius: '20px',
              px: 4,
              '&:hover': {
                backgroundColor: '#F0F0F0',
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </SuccessDialog>
    </Fragment>
  );
};

export default PaymentModal;