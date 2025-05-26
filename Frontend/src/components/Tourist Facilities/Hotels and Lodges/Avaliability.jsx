import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Popover,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as MuiIcons from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Color Palette
const colors = {
  dark: '#222831',
  mediumDark: '#393E46',
  primary: '#00ADB5',
  light: '#EEEEEE',
};

const Availability = ({ hotelAdminId }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([null]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [guestPopoverAnchorEl, setGuestPopoverAnchorEl] = useState(null);
  const [ageError, setAgeError] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const navigate = useNavigate();

  // Check login status
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!token && !!user && !!user._id;

  // Reset selections when dates change
  useEffect(() => {
    if (checkInDate || checkOutDate) {
      setSelectedRoomType('');
      setSelectedRooms([]);
      setShowBookingForm(false);
    }
  }, [checkInDate, checkOutDate]);

  // Validate room selections
  useEffect(() => {
    if (selectedRooms.length > rooms) {
      setSelectedRooms(prev => prev.slice(0, rooms));
    }
  }, [rooms, selectedRooms.length]);

  // Fetch available rooms from backend
  const fetchAvailableRooms = async () => {
    setSelectedRoomType('');
    setSelectedRooms([]);
    
    if (!checkInDate || !checkOutDate) {
      setError('Please select check-in and check-out dates');
      return;
    }
    if (!hotelAdminId) {
      setError('Hotel ID is missing. Please try again.');
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/rooms/available/${hotelAdminId}`,
        {
          params: {
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
          },
        }
      );
      const rooms = response.data.data;
      const validRooms = rooms.filter(
        (room) => room.type && room.roomNumber
      );
      setAvailableRooms(validRooms);
      setShowBookingForm(true);
      if (validRooms.length === 0) {
        setError('No valid rooms available for the selected dates.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch available rooms');
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      setError('Please select check-in and check-out dates');
      return;
    }
    fetchAvailableRooms();
  };

  // Calendar popover handlers
  const handleOpenCalendar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  // Guest popover handlers
  const handleOpenGuestPopover = (event) => {
    setGuestPopoverAnchorEl(event.currentTarget);
    setAgeError(false);
  };

  const handleCloseGuestPopover = () => {
    const isAgeFilled = childrenAges.every((age) => age !== null && age !== '');
    if (isAgeFilled) {
      setGuestPopoverAnchorEl(null);
      setAgeError(false);
    } else {
      setAgeError(true);
    }
  };

  const handleForceCloseGuestPopover = () => {
    const validatedChildren = childrenAges.filter((age) => age !== null && age !== '').length;
    setChildren(validatedChildren);
    setGuestPopoverAnchorEl(null);
    setAgeError(false);
  };

  // Guest and room count handlers
  const handleAdultsChange = (delta) => {
    setAdults((prev) => Math.max(1, prev + delta));
  };

  const handleChildrenChange = (delta) => {
    const newChildren = Math.max(0, children + delta);
    setChildren(newChildren);
    if (newChildren > childrenAges.length) {
      setChildrenAges([...childrenAges, null]);
    } else if (newChildren < childrenAges.length) {
      setChildrenAges(childrenAges.slice(0, newChildren));
    }
  };

  const handleRoomsChange = (delta) => {
    setRooms((prev) => Math.max(1, prev + delta));
  };

  const handleChildAgeChange = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
    setAgeError(false);
  };

  // Room selection handlers
  const handleRoomTypeSelection = (event) => {
    const newRoomType = event.target.value;
    setSelectedRoomType(newRoomType);
    setSelectedRooms([]);
  };

  const handleRoomSelection = (event) => {
    const selectedRoomNumbers = event.target.value;
    if (selectedRoomNumbers.length <= rooms) {
      setSelectedRooms(selectedRoomNumbers);
    }
  };

  // Handle reservation submission
  const handleReserve = async () => {
    if (!selectedRoomType || selectedRooms.length === 0) {
      setError('Please select a room type and at least one room');
      return;
    }

    if (!isLoggedIn) {
      setLoginPrompt(true);
      return;
    }

    try {
      setLoading(true);
      const promises = selectedRooms.map((roomNumber) =>
        axios.post(
          'http://localhost:2000/api/reservations',
          {
            hotelAdminId,
            userId: user._id,
            roomType: selectedRoomType,
            roomNumber,
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
            adults,
            children,
            childrenAges,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      const responses = await Promise.all(promises);
      setSuccess('Reservation(s) created successfully!');
      setSelectedRooms([]);
      setSelectedRoomType('');
      setShowBookingForm(false);
      fetchAvailableRooms();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Failed to create reservation: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle login prompt close and redirect
  const handleLoginPromptClose = () => {
    setLoginPrompt(false);
    navigate('/login');
  };

  // Get unique room types and filtered rooms
  const roomTypes = [...new Set(availableRooms.map((room) => room.type))];
  const filteredRooms = selectedRoomType
    ? availableRooms.filter((room) => room.type === selectedRoomType)
    : [];

  // Calculate if reserve button should be disabled
  const isReserveDisabled = 
    !selectedRoomType || 
    selectedRooms.length === 0 || 
    loading || 
    !isLoggedIn ||
    !checkInDate ||
    !checkOutDate ||
    selectedRooms.length > rooms;

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto', backgroundColor: colors.dark, color: colors.light }}>
      {/* Display login status */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ color: colors.light }}>
          Booking as: {isLoggedIn ? `${user.firstName} ${user.lastName}` : 'Guest'}
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ color: colors.primary }}>
        Select dates to see this property's availability and prices
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: colors.light }}>
        We Price Match
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} alignItems="center">
          {/* Date Selection */}
          <Grid item xs={12} md={3}>
            <TextField
              value={
                checkInDate && checkOutDate
                  ? `${checkInDate.format('MM/DD/YYYY')} - ${checkOutDate.format('MM/DD/YYYY')}`
                  : 'Check-in date - Check-out date'
              }
              fullWidth
              onClick={handleOpenCalendar}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleOpenCalendar} sx={{ color: colors.primary }}>
                    <CalendarMonthIcon />
                  </IconButton>
                ),
                sx: { backgroundColor: colors.mediumDark, color: colors.light },
              }}
            />
          </Grid>

          {/* Calendar Popover */}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseCalendar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            disableRestoreFocus
          >
            <Box sx={{ display: 'flex', p: 2, backgroundColor: colors.mediumDark, borderRadius: 2, boxShadow: 2 }}>
              <Box sx={{ marginRight: 2, backgroundColor: colors.dark, borderRadius: 2, p: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold' }}>
                  Check-in
                </Typography>
                <DateCalendar
                  value={checkInDate}
                  onChange={(newValue) => setCheckInDate(newValue)}
                  minDate={dayjs()}
                  disableHighlightToday
                  sx={{
                    color: colors.light,
                    '& .MuiPickersDay-root': {
                      color: colors.light,
                      '&.Mui-selected': {
                        backgroundColor: colors.primary,
                        color: colors.dark,
                      },
                      '&:hover': {
                        backgroundColor: colors.primary,
                        color: colors.dark,
                      },
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      color: colors.light,
                    },
                    '& .MuiSvgIcon-root': {
                      color: colors.primary,
                    },
                  }}
                />
              </Box>
              <Box sx={{ backgroundColor: colors.dark, borderRadius: 2, p: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold' }}>
                  Check-out
                </Typography>
                <DateCalendar
                  value={checkOutDate}
                  onChange={(newValue) => setCheckOutDate(newValue)}
                  minDate={checkInDate || dayjs()}
                  disableHighlightToday
                  sx={{
                    color: colors.light,
                    '& .MuiPickersDay-root': {
                      color: colors.light,
                      '&.Mui-selected': {
                        backgroundColor: colors.primary,
                        color: colors.dark,
                      },
                      '&:hover': {
                        backgroundColor: colors.primary,
                        color: colors.dark,
                      },
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      color: colors.light,
                    },
                    '& .MuiSvgIcon-root': {
                      color: colors.primary,
                    },
                  }}
                />
              </Box>
            </Box>
          </Popover>

          {/* Guest and Room Selection */}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              value={`${adults} Adult${adults !== 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''}, ${rooms} Room${rooms !== 1 ? 's' : ''}`}
              onClick={handleOpenGuestPopover}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleOpenGuestPopover} sx={{ color: colors.primary }}>
                    <ArrowDropDownIcon />
                  </IconButton>
                ),
                sx: { backgroundColor: colors.mediumDark, color: colors.light },
              }}
            />
            <Popover
              open={Boolean(guestPopoverAnchorEl)}
              anchorEl={guestPopoverAnchorEl}
              onClose={handleCloseGuestPopover}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <Box sx={{ p: 6, width: '300px', position: 'relative', backgroundColor: colors.mediumDark, color: colors.light }}>
                <IconButton
                  sx={{
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    paddingBottom: '8px',
                    color: colors.light,
                  }}
                  onClick={handleForceCloseGuestPopover}
                >
                  <CloseIcon />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Adults</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleAdultsChange(-1)} sx={{ color: colors.primary }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{adults}</Typography>
                    <IconButton onClick={() => handleAdultsChange(1)} sx={{ color: colors.primary }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Children</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleChildrenChange(-1)} sx={{ color: colors.primary }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{children}</Typography>
                    <IconButton onClick={() => handleChildrenChange(1)} sx={{ color: colors.primary }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                {children > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Age needed
                    </Typography>
                    {childrenAges.map((age, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Child {index + 1}</Typography>
                        <FormControl error={ageError && age === null} size="small">
                          <Select
                            value={age === null ? '' : age}
                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                            sx={{ width: '100px', backgroundColor: colors.dark, color: colors.light }}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              Select age
                            </MenuItem>
                            {[...Array(18)].map((_, i) => (
                              <MenuItem key={i} value={i} sx={{ backgroundColor: colors.mediumDark, color: colors.light }}>
                                {i} years
                              </MenuItem>
                            ))}
                          </Select>
                          {ageError && age === null && (
                            <FormHelperText>Age is required</FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                    ))}
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Rooms</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleRoomsChange(-1)} sx={{ color: colors.primary }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{rooms}</Typography>
                    <IconButton onClick={() => handleRoomsChange(1)} sx={{ color: colors.primary }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Button variant="contained" fullWidth onClick={handleCloseGuestPopover} sx={{ backgroundColor: colors.primary, color: colors.light }}>
                  Done
                </Button>
              </Box>
            </Popover>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              disabled={loading || !checkInDate || !checkOutDate}
              sx={{ backgroundColor: colors.primary, color: colors.light }}
            >
              {loading ? 'Loading...' : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>

      {/* Display Available Rooms and Booking Form */}
      {showBookingForm && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
            Available Rooms
          </Typography>
          {availableRooms.length === 0 ? (
            <Typography sx={{ color: colors.light }}>
              No rooms available for the selected dates.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: colors.mediumDark, color: colors.light }}>
              <Table>
                <TableHead sx={{ backgroundColor: colors.primary }}>
                  <TableRow>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Room Type</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Room Number</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Price</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Number of Rooms</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Your Choice</TableCell>
                    <TableCell sx={{ color: colors.light }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                      <FormControl fullWidth>
                        <Select
                          value={selectedRoomType}
                          onChange={handleRoomTypeSelection}
                          displayEmpty
                          sx={{ backgroundColor: colors.dark, color: colors.light }}
                        >
                          <MenuItem value="" disabled>
                            Select Room Type
                          </MenuItem>
                          {roomTypes.map((type, index) => (
                            <MenuItem key={index} value={type} sx={{ backgroundColor: colors.mediumDark, color: colors.light }}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                        {selectedRoomType && (
                          <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                              {selectedRoomType} Room Details
                            </Typography>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: colors.dark }}>
                              <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                                Bathrooms: {availableRooms.find((r) => r.type === selectedRoomType)?.bathrooms || 1}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                                Size: {availableRooms.find((r) => r.type === selectedRoomType)?.size || 'Unknown'}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                                Amenities:
                              </Typography>
                              <List>
                                {(availableRooms.find((r) => r.type === selectedRoomType)?.amenities || []).map((amenity, index) => (
                                  <ListItem key={index}>
                                    <ListItemIcon>
                                      {MuiIcons[amenity.icon] ? React.createElement(MuiIcons[amenity.icon], { sx: { color: colors.primary } }) : <MuiIcons.Chair sx={{ color: colors.primary }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={amenity.name} sx={{ color: colors.light }} />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          </Box>
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                      <FormControl fullWidth>
                        <Select
                          multiple
                          value={selectedRooms}
                          onChange={handleRoomSelection}
                          displayEmpty
                          disabled={!selectedRoomType}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.length === 0 ? (
                                <Typography variant="body2" sx={{ color: colors.light }}>
                                  Select Room(s)
                                </Typography>
                              ) : (
                                selected.map((roomNumber) => (
                                  <Chip 
                                    key={roomNumber} 
                                    label={roomNumber} 
                                    sx={{ 
                                      backgroundColor: selectedRooms.length > rooms ? 'error.main' : colors.primary, 
                                      color: colors.light 
                                    }} 
                                  />
                                ))
                              )}
                            </Box>
                          )}
                          sx={{ 
                            backgroundColor: colors.dark, 
                            color: colors.light,
                            border: selectedRooms.length > rooms ? '1px solid red' : 'none'
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Room(s)
                          </MenuItem>
                          {filteredRooms.map((room) => (
                            <MenuItem
                              key={room.id}
                              value={room.roomNumber}
                              disabled={
                                selectedRooms.length >= rooms && !selectedRooms.includes(room.roomNumber)
                              }
                              sx={{ backgroundColor: colors.mediumDark, color: colors.light }}
                            >
                              {room.roomNumber}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                      ${availableRooms.find((r) => r.type === selectedRoomType)?.price || 'N/A'} / night
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                      {rooms}
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                      {selectedRooms.length} room{selectedRooms.length !== 1 ? 's' : ''} selected
                    </TableCell>
                    <TableCell sx={{ verticalAlign: 'top' }}>
                      <Button
                        variant="contained"
                        onClick={handleReserve}
                        disabled={isReserveDisabled}
                        sx={{ backgroundColor: colors.primary, color: colors.light }}
                      >
                        {loading ? 'Reserving...' : 'Reserve'}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* Notifications */}
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={loginPrompt} autoHideDuration={6000} onClose={handleLoginPromptClose}>
        <Alert onClose={handleLoginPromptClose} severity="warning" sx={{ width: '100%' }}>
          Please log in to make a reservation. Redirecting to login page...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Availability;