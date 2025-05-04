import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Badge,
  Breadcrumbs,
  Link,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Favorite,
  Star,
  AccessTime,
  NavigateNext,
  Delete,
  KingBed,
  CalendarToday,
  Hotel,
  NightsStay,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Recommended from './Recommended';
import PaymentModal from './PaymentModal';

const Reserve = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [reservationToRemove, setReservationToRemove] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check login status
  const token = localStorage.getItem('token');
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
    user = null;
  }

  // Memoize user to prevent useEffect re-runs
  const memoizedUser = useMemo(() => user, [JSON.stringify(user)]);

  // Validate user.id
  const userId = memoizedUser?.id;
  const isLoggedIn = !!token && !!userId && !!memoizedUser;
  const isRegularUser = isLoggedIn && memoizedUser.role === 'user';

  // Detailed localStorage logging
  console.log('LocalStorage contents:', {
    token,
    user: memoizedUser,
    userId,
    isLoggedIn,
    isRegularUser,
  });

  // Fetch reservations for regular users
  useEffect(() => {
    const fetchReservations = async () => {
      if (!isLoggedIn || !isRegularUser) {
        console.log('Skipping reservation fetch:', { isLoggedIn, isRegularUser, userId });
        return;
      }

      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      try {
        console.log(`Fetching reservations for user ID: ${userId}`);
        const validateResponse = await axios.get(
          `http://localhost:2000/api/reservations/user?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const resData = validateResponse.data.data;

        const enhancedReservations = await Promise.all(
          resData.map(async (reservation) => {
            try {
              const hotelResponse = await axios.get(
                `http://localhost:2000/api/hotels/${reservation.hotelAdminId}`
              );
              const hotel = hotelResponse.data.data;

              const reviewResponse = await axios.get(
                `http://localhost:2000/api/reviews/${reservation.hotelAdminId}/average`
              );
              const { averageRating } = reviewResponse.data.data;

              const checkIn = new Date(reservation.checkInDate);
              const checkOut = new Date(reservation.checkOutDate);
              const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
              const duration = `${nights} night${nights !== 1 ? 's' : ''}`;

              return {
                id: reservation._id,
                title: hotel.name,
                price: (reservation.totalPrice / nights).toLocaleString(),
                duration,
                image: hotel.images[0]?.url || 'https://via.placeholder.com/500x180?text=No+Image',
                saved: true,
                location: hotel.location,
                date: `${checkIn.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })} - ${checkOut.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}`,
                rating: averageRating,
                hotelName: hotel.name,
                roomType: reservation.roomType,
                roomNumbers: [reservation.roomNumber],
                numberOfRooms: 1,
                checkInDate: checkIn.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }),
                checkOutDate: checkOut.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }),
                totalPrice: reservation.totalPrice.toLocaleString(),
              };
            } catch (err) {
              console.error(`Error processing reservation ${reservation._id}:`, err);
              return null;
            }
          })
        );

        const validReservations = enhancedReservations.filter((res) => res !== null);
        setReservations(validReservations);

        if (validReservations.length === 0) {
          console.log('No reservations found for user ID:', userId);
        }
      } catch (err) {
        console.error('Reservation fetch failed:', err);
        if (err.response?.status === 400) {
          setError('Invalid user ID. Please log in again.');
        } else if (err.response?.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else if (err.response?.status === 403) {
          setError('Invalid token. Please log in again.');
        } else if (err.response?.status === 404) {
          setError('Reservations endpoint not found. Please contact support.');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch reservations');
        }
      }
    };

    fetchReservations();
  }, [token, memoizedUser, isLoggedIn, isRegularUser, userId]);

  const savedCount = reservations.filter((r) => r.saved).length;

  const handleRemoveClick = (reservation) => {
    setReservationToRemove(reservation);
    setOpenConfirm(true);
  };

  const confirmRemove = () => {
    setReservations(reservations.map((r) => (r.id === reservationToRemove.id ? { ...r, saved: false } : r)));
    setOpenConfirm(false);
  };

  const cancelRemove = () => {
    setOpenConfirm(false);
  };

  const handleBookNow = (reservation) => {
    setCurrentBooking({
      hotelName: reservation.hotelName,
      roomType: reservation.roomType,
      roomNumbers: reservation.roomNumbers,
      numberOfRooms: reservation.numberOfRooms,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      totalPrice: reservation.totalPrice,
    });
    setOpenPaymentModal(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#222831',
        minHeight: '100vh',
        padding: { xs: 2, md: 3 },
        color: '#EEEEEE',
      }}
    >
      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        bookingDetails={currentBooking}
      />

      <Dialog open={openConfirm} onClose={cancelRemove}>
        <DialogTitle sx={{ bgcolor: '#393E46', color: '#EEEEEE' }}>Confirm Removal</DialogTitle>
        <DialogContent sx={{ bgcolor: '#393E46', color: '#EEEEEE' }}>
          Are you sure you want to remove "{reservationToRemove?.title}" from your saved reservations?
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#393E46' }}>
          <Button onClick={cancelRemove} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
          <Button
            onClick={confirmRemove}
            sx={{
              color: '#EEEEEE',
              backgroundColor: '#00ADB5',
              '&:hover': { backgroundColor: '#008B8B' },
            }}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Breadcrumbs
        separator={<NavigateNext fontSize="small" sx={{ color: '#00ADB5' }} />}
        sx={{ mb: 2 }}
      >
        <Link underline="hover" color="#EEEEEE" href="/">
          Home
        </Link>
        <Typography color="#00ADB5" sx={{ fontWeight: 'bold' }}>
          Reservations
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#00ADB5',
            fontSize: '1.4rem',
          }}
        >
          My Reservations
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Badge
            badgeContent={savedCount}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#00ADB5',
                color: '#EEEEEE',
                right: -3,
                top: 8,
              },
            }}
          >
            <Button
              variant={activeTab === 'saved' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('saved')}
              size="small"
              sx={{
                backgroundColor: activeTab === 'saved' ? '#00ADB5' : 'transparent',
                color: '#EEEEEE',
                borderColor: '#00ADB5',
                minWidth: 90,
                fontSize: '0.8rem',
                '&:hover': {
                  backgroundColor: activeTab === 'saved' ? '#008B8B' : '#393E46',
                },
              }}
              startIcon={<Favorite sx={{ fontSize: '1rem' }} />}
            >
              Saved
            </Button>
          </Badge>

          <Button
            variant={activeTab === 'recommended' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('recommended')}
            size="small"
            sx={{
              backgroundColor: activeTab === 'recommended' ? '#00ADB5' : 'transparent',
              color: '#EEEEEE',
              borderColor: '#00ADB5',
              minWidth: 90,
              fontSize: '0.8rem',
              '&:hover': {
                backgroundColor: activeTab === 'recommended' ? '#008B8B' : '#393E46',
              },
            }}
          >
            Recommended
          </Button>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', mb: 2 }} />

      {activeTab === 'saved' ? (
        <>
          {!isLoggedIn && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: '40vh', md: '50vh' },
                textAlign: 'center',
                p: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#393E46',
                  width: 60,
                  height: 60,
                  mb: 1.5,
                }}
              >
                <Favorite sx={{ color: '#00ADB5', fontSize: '1.8rem' }} />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: '#00ADB5',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                Please Log In
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#EEEEEE',
                  maxWidth: '300px',
                  opacity: 0.8,
                  mb: 2,
                  fontSize: '0.9rem',
                }}
              >
                Log in to view your saved reservations.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: '#00ADB5',
                  borderColor: '#00ADB5',
                  px: 2,
                  fontSize: '0.8rem',
                }}
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </Box>
          )}

          {isLoggedIn && !isRegularUser && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: '40vh', md: '50vh' },
                textAlign: 'center',
                p: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#393E46',
                  width: 60,
                  height: 60,
                  mb: 1.5,
                }}
              >
                <Favorite sx={{ color: '#00ADB5', fontSize: '1.8rem' }} />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: '#00ADB5',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                Access Restricted
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#EEEEEE',
                  maxWidth: '300px',
                  opacity: 0.8,
                  mb: 2,
                  fontSize: '0.9rem',
                }}
              >
                Only regular users can view reservations. Please log in as a regular user.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: '#00ADB5',
                  borderColor: '#00ADB5',
                  px: 2,
                  fontSize: '0.8rem',
                }}
                onClick={() => navigate('/login')}
              >
                Log In as User
              </Button>
            </Box>
          )}

          {isLoggedIn && isRegularUser && (
            <Grid container spacing={3}>
              {reservations.filter((r) => r.saved).map((reservation) => (
                <Grid item xs={12} key={reservation.id}>
                  <Card
                    sx={{
                      backgroundColor: '#393E46',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '100%', md: 280 },
                        height: { xs: 180, md: 'auto' },
                        objectFit: 'cover',
                      }}
                      image={reservation.image}
                      alt={reservation.title}
                    />

                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                          }}
                        >
                          {reservation.hotelName}
                        </Typography>
                        <Chip
                          icon={<Star sx={{ color: '#FFD700', fontSize: '1rem' }} />}
                          label={`${reservation.rating}/5`}
                          size="medium"
                          sx={{
                            backgroundColor: 'rgba(0, 173, 181, 0.2)',
                            color: '#EEEEEE',
                            height: 28,
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: '#00ADB5',
                          mb: 2,
                          fontSize: '0.95rem',
                        }}
                      >
                        {reservation.location}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <KingBed sx={{ color: '#00ADB5', mr: 1 }} />
                          <Typography variant="body2">{reservation.roomType}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Hotel sx={{ color: '#00ADB5', mr: 1 }} />
                          <Typography variant="body2">
                            Rooms: {reservation.roomNumbers.join(', ')}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <NightsStay sx={{ color: '#00ADB5', mr: 1 }} />
                          <Typography variant="body2">{reservation.duration}</Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: 'rgba(0, 173, 181, 0.1)',
                          p: 1.5,
                          borderRadius: 1,
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CalendarToday sx={{ color: '#00ADB5', mr: 1.5 }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                              Check-in: {reservation.checkInDate}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                              Check-out: {reservation.checkOutDate}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mt: 'auto' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#00ADB5',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            mb: 0.5,
                          }}
                        >
                          Total: ${reservation.totalPrice}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#EEEEEE' }}>
                          (${reservation.price} per night)
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 2,
                        borderLeft: { md: '1px solid #555' },
                        minWidth: 140,
                      }}
                    >
                      <IconButton
                        aria-label="remove"
                        onClick={() => handleRemoveClick(reservation)}
                        sx={{
                          alignSelf: 'flex-end',
                          color: '#EEEEEE',
                          '&:hover': {
                            color: '#ff4444',
                            backgroundColor: 'rgba(255, 68, 68, 0.1)',
                          },
                        }}
                      >
                        <Delete fontSize="medium" />
                      </IconButton>

                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => handleBookNow(reservation)}
                        sx={{
                          backgroundColor: '#00ADB5',
                          color: '#EEEEEE',
                          px: 3,
                          py: 1.5,
                          borderRadius: 1,
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#008B8B',
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {isLoggedIn && isRegularUser && reservations.filter((r) => r.saved).length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: '40vh', md: '50vh' },
                textAlign: 'center',
                p: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#393E46',
                  width: 60,
                  height: 60,
                  mb: 1.5,
                }}
              >
                <Favorite sx={{ color: '#00ADB5', fontSize: '1.8rem' }} />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: '#00ADB5',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                No Saved Reservations
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#EEEEEE',
                  maxWidth: '300px',
                  opacity: 0.8,
                  mb: 2,
                  fontSize: '0.9rem',
                }}
              >
                Save your favorite hotels to see them here
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: '#00ADB5',
                  borderColor: '#00ADB5',
                  px: 2,
                  fontSize: '0.8rem',
                }}
                onClick={() => navigate('/hotels')}
              >
                Browse Hotels
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Recommended />
      )}
    </Box>
  );
};

export default Reserve;