import React from 'react';
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
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Telebirr from "../../assets/logo/TeleBirr.png";
import chapa from "../../assets/logo/Chapa.png";
import Cbebirr from "../../assets/logo/CBEBirr.png";

const PaymentModal = ({ open, onClose, bookingDetails }) => {
  const [paymentMethod, setPaymentMethod] = React.useState('chapa');
  const [selectedChapaOption, setSelectedChapaOption] = React.useState(null);
  const [cardDetails, setCardDetails] = React.useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [mobilePaymentDetails, setMobilePaymentDetails] = React.useState({
    phoneNumber: '',
    fullName: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setSelectedChapaOption(null);
  };

  const handleChapaOptionChange = (option) => {
    setSelectedChapaOption(option);
  };

  const handleCardDetailChange = (field) => (event) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleMobilePaymentChange = (field) => (event) => {
    setMobilePaymentDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handlePay = () => {
    // Validate inputs
    if (paymentMethod === 'chapa') {
      if (!selectedChapaOption) {
        showNotification('Please select a payment option', 'error');
        return;
      }
      if (!mobilePaymentDetails.phoneNumber || !mobilePaymentDetails.fullName) {
        showNotification('Please fill all required fields for mobile payment', 'error');
        return;
      }
      if (!validatePhoneNumber(mobilePaymentDetails.phoneNumber)) {
        showNotification('Please enter a valid Ethiopian phone number (09XXXXXXXX)', 'error');
        return;
      }
    }
    if (paymentMethod === 'mastercard') {
      if (!cardDetails.name || 
          !cardDetails.email || 
          !cardDetails.cardNumber || 
          !cardDetails.expiry || 
          !cardDetails.cvv) {
        showNotification('Please fill all card details', 'error');
        return;
      }
      if (!validateCardNumber(cardDetails.cardNumber)) {
        showNotification('Please enter a valid 16-digit card number', 'error');
        return;
      }
      if (!validateExpiry(cardDetails.expiry)) {
        showNotification('Please enter a valid expiry date (MM/YY)', 'error');
        return;
      }
      if (!validateCVV(cardDetails.cvv)) {
        showNotification('Please enter a valid CVV (3 or 4 digits)', 'error');
        return;
      }
    }
    
    // Start loading
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      showNotification(`Payment successful! ${paymentMethod === 'chapa' ? `(${selectedChapaOption})` : ''} $${bookingDetails.totalPrice} paid`);
      setTimeout(onClose, 2000);
    }, 4000);
  };

  if (!bookingDetails) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          backgroundColor: '#393E46', 
          color: '#EEEEEE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2
        }}>
          Complete Your Booking
          <IconButton 
            onClick={onClose}
            sx={{
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#222831', color: '#EEEEEE' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#00ADB5', mb: 1 }}>
              Booking Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">Hotel Name:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{bookingDetails.hotelName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Room Type:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{bookingDetails.roomType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Room Number:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {bookingDetails.roomNumbers?.join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Number of Rooms:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{bookingDetails.numberOfRooms}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Check-in Date:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{bookingDetails.checkInDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Check-out Date:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{bookingDetails.checkOutDate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2, backgroundColor: '#393E46' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ textAlign: 'right', color: '#00ADB5' }}>
                  Total: ${bookingDetails.totalPrice}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
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
                    backgroundColor: paymentMethod === 'chapa' ? 'rgba(0, 173, 181, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 173, 181, 0.05)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio 
                      checked={paymentMethod === 'chapa'}
                      sx={{ color: '#00ADB5' }} 
                    />
                    <Avatar 
                      src={chapa} 
                      sx={{ width: 24, height: 24, mr: 1 }} 
                    />
                    <Typography>Chapa</Typography>
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
                    backgroundColor: paymentMethod === 'mastercard' ? 'rgba(0, 173, 181, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 173, 181, 0.05)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio 
                      checked={paymentMethod === 'mastercard'}
                      sx={{ color: '#00ADB5' }} 
                    />
                    <Avatar 
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" 
                      sx={{ width: 24, height: 24, mr: 1 }} 
                    />
                    <Typography>Mastercard</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {paymentMethod === 'chapa' && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 173, 181, 0.1)', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Select payment option:
                </Typography>
                <List>
                  <ListItem 
                    button 
                    onClick={() => handleChapaOptionChange('telebirr')}
                    sx={{
                      backgroundColor: selectedChapaOption === 'telebirr' ? 'rgba(0, 173, 181, 0.2)' : 'transparent',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={Telebirr} sx={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Telebirr" />
                    {selectedChapaOption === 'telebirr' && (
                      <Radio checked sx={{ color: '#00ADB5' }} />
                    )}
                  </ListItem>
                  
                  {selectedChapaOption === 'telebirr' && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        value={mobilePaymentDetails.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobilePaymentDetails(prev => ({
                            ...prev,
                            phoneNumber: value
                          }));
                        }}
                        placeholder="09XXXXXXXX"
                        error={mobilePaymentDetails.phoneNumber && !validatePhoneNumber(mobilePaymentDetails.phoneNumber)}
                        helperText={
                          mobilePaymentDetails.phoneNumber && !validatePhoneNumber(mobilePaymentDetails.phoneNumber) 
                            ? "Please enter a valid Ethiopian phone number (09XXXXXXXX)" 
                            : ""
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
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ff6b6b',
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        value={mobilePaymentDetails.fullName}
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
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          }
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePay}
                        disabled={loading}
                        sx={{
                          backgroundColor: '#00ADB5',
                          color: '#EEEEEE',
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: '#008B8B'
                          }
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
                        ) : (
                          'Pay with Telebirr'
                        )}
                      </Button>
                    </Box>
                  )}
                  
                  <ListItem 
                    button 
                    onClick={() => handleChapaOptionChange('cbe')}
                    sx={{
                      backgroundColor: selectedChapaOption === 'cbe' ? 'rgba(0, 173, 181, 0.2)' : 'transparent',
                      borderRadius: 1
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={Cbebirr} sx={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="CBE Birr" />
                    {selectedChapaOption === 'cbe' && (
                      <Radio checked sx={{ color: '#00ADB5' }} />
                    )}
                  </ListItem>
                  
                  {selectedChapaOption === 'cbe' && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        value={mobilePaymentDetails.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobilePaymentDetails(prev => ({
                            ...prev,
                            phoneNumber: value
                          }));
                        }}
                        placeholder="09XXXXXXXX"
                        error={mobilePaymentDetails.phoneNumber && !validatePhoneNumber(mobilePaymentDetails.phoneNumber)}
                        helperText={
                          mobilePaymentDetails.phoneNumber && !validatePhoneNumber(mobilePaymentDetails.phoneNumber) 
                            ? "Please enter a valid Ethiopian phone number (09XXXXXXXX)" 
                            : ""
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
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ff6b6b',
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        value={mobilePaymentDetails.fullName}
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
                          },
                          '& .MuiInputLabel-root': {
                            color: '#EEEEEE',
                          },
                          '& .MuiInputBase-input': {
                            color: '#EEEEEE',
                          }
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePay}
                        disabled={loading}
                        sx={{
                          backgroundColor: '#00ADB5',
                          color: '#EEEEEE',
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: '#008B8B'
                          }
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
                        ) : (
                          'Pay with CBE Birr'
                        )}
                      </Button>
                    </Box>
                  )}
                </List>
              </Box>
            )}

            {paymentMethod === 'mastercard' && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(0, 173, 181, 0.1)', borderRadius: 1 }}>
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
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        }
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00ADB5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#EEEEEE',
                        },
                        '& .MuiInputBase-input': {
                          color: '#EEEEEE',
                        }
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
                        setCardDetails(prev => ({
                          ...prev,
                          cardNumber: value
                        }));
                      }}
                      error={cardDetails.cardNumber && !validateCardNumber(cardDetails.cardNumber)}
                      helperText={
                        cardDetails.cardNumber && !validateCardNumber(cardDetails.cardNumber)
                          ? "Please enter a valid 16-digit card number"
                          : ""
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
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
                        }
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
                        setCardDetails(prev => ({
                          ...prev,
                          expiry: value
                        }));
                      }}
                      error={cardDetails.expiry && !validateExpiry(cardDetails.expiry)}
                      helperText={
                        cardDetails.expiry && !validateExpiry(cardDetails.expiry)
                          ? "Please enter a valid expiry date (MM/YY)"
                          : ""
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
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
                        }
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
                        setCardDetails(prev => ({
                          ...prev,
                          cvv: value
                        }));
                      }}
                      error={cardDetails.cvv && !validateCVV(cardDetails.cvv)}
                      helperText={
                        cardDetails.cvv && !validateCVV(cardDetails.cvv)
                          ? "Please enter a valid CVV (3 or 4 digits)"
                          : ""
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#393E46',
                          },
                          '&:hover fieldset': {
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
                        }
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
                        backgroundColor: '#00ADB5',
                        color: '#EEEEEE',
                        py: 1.5,
                        mt: 1,
                        '&:hover': {
                          backgroundColor: '#008B8B'
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
                      ) : (
                        'Pay with Mastercard'
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
                backgroundColor: '#00ADB5', 
                color: '#EEEEEE',
                fontSize: '0.7rem',
                mt: 2
              }} 
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#393E46' }}>
          <Button onClick={onClose} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default PaymentModal;