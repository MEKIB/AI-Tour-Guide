import React, { useState } from 'react';
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
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
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
import {
  Kitchen as KitchenIcon,
  Balcony as BalconyIcon,
  Landscape as LandscapeIcon,
  Tv as TvIcon,
  Wifi as WifiIcon,
  LocalLaundryService as LaundryIcon,
  Bathtub as BathtubIcon,
  KingBed as BedIcon,
  CleaningServices as CleaningIcon,
  Chair as ChairIcon,
  Coffee as CoffeeIcon,
  Microwave as MicrowaveIcon,
  DryCleaning as DryCleaningIcon,
  LocalDining as DiningIcon,
  AcUnit as AirConditionerIcon,
  LocalParking as ParkingIcon,
  Elevator as ElevatorIcon,
  Pool as PoolIcon,
  FitnessCenter as GymIcon,
  Pets as PetsIcon,
  SmokingRooms as SmokingIcon,
  RoomService as RoomServiceIcon,
} from '@mui/icons-material';

// Color Palette
const colors = {
  dark: '#222831', // Dark Gray
  mediumDark: '#393E46', // Medium Gray
  primary: '#00ADB5', // Teal
  light: '#EEEEEE', // Light Gray
};

// Mock data for available rooms
const availableRooms = [
  { id: 1, type: 'Two-Bedroom Apartment', roomNumber: 'R101', price: 200 },
  { id: 2, type: 'One-Bedroom Apartment', roomNumber: 'R102', price: 150 },
  { id: 3, type: 'Studio Apartment', roomNumber: 'R103', price: 100 },
  { id: 4, type: 'Two-Bedroom Apartment', roomNumber: 'R104', price: 220 },
  { id: 5, type: 'One-Bedroom Apartment', roomNumber: 'R105', price: 160 },
];

// Apartment details
const apartmentDetails = {
  'Two-Bedroom Apartment': {
    bedrooms: [
      { name: 'Bedroom 1', beds: '1 queen bed' },
      { name: 'Bedroom 2', beds: '1 queen bed' },
    ],
    bathrooms: 2,
    size: '110 m²',
    amenities: [
      'Private kitchen',
      'Balcony',
      'Mountain view',
      'City view',
      'Patio',
      'Flat-screen TV',
      'Free Wifi',
      'Free toiletries',
      'Kitchen with washing machine',
      'Sofa',
      'Bathtub or shower',
      'Towels and linens provided',
      'Socket near the bed',
      'Cleaning products',
      'Tile/Marble floor',
      'Sitting area',
      'Slippers',
      'Refrigerator',
      'Ironing facilities',
      'Tea/Coffee maker',
      'Iron',
      'Interconnecting room(s) available',
      'Microwave',
      'Hairdryer',
      'Kitchenware',
      'Kitchenette',
      'Guest bathroom',
      'Carpeted flooring',
      'Electric kettle',
      'Alarm clock',
      'Oven',
      'Stovetop',
      'Toaster',
      'Dining area',
      'Upper floors accessible by stairs only',
      'Private apartment in building',
      'Clothes rack',
      'Drying rack for clothing',
      'Toilet paper',
      'Hand sanitizer',
    ],
  },
  'One-Bedroom Apartment': {
    bedrooms: [{ name: 'Bedroom 1', beds: '1 queen bed' }],
    bathrooms: 1,
    size: '80 m²',
    amenities: [
      'Private kitchen',
      'Balcony',
      'City view',
      'Flat-screen TV',
      'Free Wifi',
      'Free toiletries',
      'Kitchen with washing machine',
      'Sofa',
      'Bathtub or shower',
      'Towels and linens provided',
      'Socket near the bed',
      'Cleaning products',
      'Tile/Marble floor',
      'Sitting area',
      'Slippers',
      'Refrigerator',
      'Ironing facilities',
      'Tea/Coffee maker',
      'Iron',
      'Microwave',
      'Hairdryer',
      'Kitchenware',
      'Carpeted flooring',
      'Electric kettle',
      'Alarm clock',
      'Oven',
      'Stovetop',
      'Toaster',
      'Dining area',
      'Private apartment in building',
      'Clothes rack',
      'Toilet paper',
      'Hand sanitizer',
    ],
  },
  'Studio Apartment': {
    bedrooms: [],
    bathrooms: 1,
    size: '50 m²',
    amenities: [
      'Private kitchen',
      'City view',
      'Flat-screen TV',
      'Free Wifi',
      'Free toiletries',
      'Kitchen with washing machine',
      'Sofa',
      'Bathtub or shower',
      'Towels and linens provided',
      'Socket near the bed',
      'Cleaning products',
      'Tile/Marble floor',
      'Sitting area',
      'Slippers',
      'Refrigerator',
      'Ironing facilities',
      'Tea/Coffee maker',
      'Iron',
      'Microwave',
      'Hairdryer',
      'Kitchenware',
      'Carpeted flooring',
      'Electric kettle',
      'Alarm clock',
      'Oven',
      'Stovetop',
      'Toaster',
      'Dining area',
      'Private apartment in building',
      'Clothes rack',
      'Toilet paper',
      'Hand sanitizer',
    ],
  },
};

// Amenity icons mapping
const amenityIcons = {
  'Private kitchen': <KitchenIcon sx={{ color: colors.primary }} />,
  Balcony: <BalconyIcon sx={{ color: colors.primary }} />,
  'Mountain view': <LandscapeIcon sx={{ color: colors.primary }} />,
  'City view': <LandscapeIcon sx={{ color: colors.primary }} />,
  Patio: <LandscapeIcon sx={{ color: colors.primary }} />,
  'Flat-screen TV': <TvIcon sx={{ color: colors.primary }} />,
  'Free Wifi': <WifiIcon sx={{ color: colors.primary }} />,
  'Free toiletries': <CleaningIcon sx={{ color: colors.primary }} />,
  'Kitchen with washing machine': <LaundryIcon sx={{ color: colors.primary }} />,
  Sofa: <ChairIcon sx={{ color: colors.primary }} />,
  'Bathtub or shower': <BathtubIcon sx={{ color: colors.primary }} />,
  'Towels and linens provided': <BedIcon sx={{ color: colors.primary }} />,
  'Socket near the bed': <CoffeeIcon sx={{ color: colors.primary }} />,
  'Cleaning products': <CleaningIcon sx={{ color: colors.primary }} />,
  'Tile/Marble floor': <ChairIcon sx={{ color: colors.primary }} />,
  'Sitting area': <ChairIcon sx={{ color: colors.primary }} />,
  Slippers: <ChairIcon sx={{ color: colors.primary }} />,
  Refrigerator: <KitchenIcon sx={{ color: colors.primary }} />,
  'Ironing facilities': <CleaningIcon sx={{ color: colors.primary }} />,
  'Tea/Coffee maker': <CoffeeIcon sx={{ color: colors.primary }} />,
  Iron: <CleaningIcon sx={{ color: colors.primary }} />,
  'Interconnecting room(s) available': <ChairIcon sx={{ color: colors.primary }} />,
  Microwave: <MicrowaveIcon sx={{ color: colors.primary }} />,
  Hairdryer: <DryCleaningIcon sx={{ color: colors.primary }} />,
  Kitchenware: <KitchenIcon sx={{ color: colors.primary }} />,
  Kitchenette: <KitchenIcon sx={{ color: colors.primary }} />,
  'Guest bathroom': <BathtubIcon sx={{ color: colors.primary }} />,
  'Carpeted flooring': <ChairIcon sx={{ color: colors.primary }} />,
  'Electric kettle': <CoffeeIcon sx={{ color: colors.primary }} />,
  'Alarm clock': <CoffeeIcon sx={{ color: colors.primary }} />,
  Oven: <KitchenIcon sx={{ color: colors.primary }} />,
  Stovetop: <KitchenIcon sx={{ color: colors.primary }} />,
  Toaster: <KitchenIcon sx={{ color: colors.primary }} />,
  'Dining area': <DiningIcon sx={{ color: colors.primary }} />,
  'Upper floors accessible by stairs only': <ElevatorIcon sx={{ color: colors.primary }} />,
  'Private apartment in building': <ChairIcon sx={{ color: colors.primary }} />,
  'Clothes rack': <ChairIcon sx={{ color: colors.primary }} />,
  'Drying rack for clothing': <LaundryIcon sx={{ color: colors.primary }} />,
  'Toilet paper': <CleaningIcon sx={{ color: colors.primary }} />,
  'Hand sanitizer': <CleaningIcon sx={{ color: colors.primary }} />,
};

const Availability = () => {
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
  const [selectedApartmentType, setSelectedApartmentType] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reservePopoverAnchorEl, setReservePopoverAnchorEl] = useState(null);

  const handleSearch = () => {
    console.log('Check-in Date:', checkInDate);
    console.log('Check-out Date:', checkOutDate);
    console.log('Adults:', adults);
    console.log('Children:', children);
    console.log('Children Ages:', childrenAges);
    console.log('Rooms:', rooms);
    setShowBookingForm(true);
  };

  const handleOpenCalendar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

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

  const handleReservePopoverOpen = (event) => {
    setReservePopoverAnchorEl(event.currentTarget);
  };

  const handleReservePopoverClose = () => {
    setReservePopoverAnchorEl(null);
  };

  const reservePopoverOpen = Boolean(reservePopoverAnchorEl);

  const handleForceCloseGuestPopover = () => {
    const validatedChildren = childrenAges.filter((age) => age !== null && age !== '').length;
    setChildren(validatedChildren);
    setGuestPopoverAnchorEl(null);
    setAgeError(false);
  };

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

  const handleApartmentTypeSelection = (event) => {
    setSelectedApartmentType(event.target.value);
    setSelectedRooms([]);
  };

  const handleRoomSelection = (event) => {
    const selectedRoomNumbers = event.target.value;
    if (selectedRoomNumbers.length <= rooms) {
      setSelectedRooms(selectedRoomNumbers);
    }
  };

  const handleReserve = () => {
    console.log('Selected Apartment Type:', selectedApartmentType);
    console.log('Selected Rooms:', selectedRooms);
    setShowBookingForm(true);
  };

  const apartmentTypes = [...new Set(availableRooms.map((room) => room.type))];
  const filteredRooms = selectedApartmentType
    ? availableRooms.filter((room) => room.type === selectedApartmentType)
    : availableRooms;

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto', backgroundColor: colors.dark, color: colors.light }}>
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
            <Box sx={{ display: 'flex', p: 2, backgroundColor: colors.mediumDark, borderRadius: 2, boxShadow: 3 }}>
              {/* Check-in Calendar */}
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

              {/* Check-out Calendar */}
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
            <Button variant="contained" fullWidth onClick={handleSearch} sx={{ backgroundColor: colors.primary, color: colors.light }}>
              Search
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
          <TableContainer component={Paper} sx={{ backgroundColor: colors.mediumDark, color: colors.light }}>
            <Table>
              <TableHead sx={{ backgroundColor: colors.primary }}>
                <TableRow>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Apartment Type</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Room Number</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Price</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Number of Apartments</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', color: colors.light }}>Your Choice</TableCell>
                  <TableCell sx={{ color: colors.light }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                    <FormControl fullWidth>
                      <Select
                        value={selectedApartmentType}
                        onChange={handleApartmentTypeSelection}
                        displayEmpty
                        sx={{ backgroundColor: colors.dark, color: colors.light }}
                      >
                        <MenuItem value="" disabled>
                          Select Apartment Type
                        </MenuItem>
                        {apartmentTypes.map((type, index) => (
                          <MenuItem key={index} value={type} sx={{ backgroundColor: colors.mediumDark, color: colors.light }}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {selectedApartmentType && (
                        <Box sx={{ mt: 4 }}>
                          <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                            {selectedApartmentType} Details
                          </Typography>
                          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: colors.dark }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                              Bedrooms:
                            </Typography>
                            <List>
                              {apartmentDetails[selectedApartmentType].bedrooms.map((bedroom, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={`${bedroom.name}: ${bedroom.beds}`} sx={{ color: colors.light }} />
                                </ListItem>
                              ))}
                            </List>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                              Bathrooms: {apartmentDetails[selectedApartmentType].bathrooms}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                              Size: {apartmentDetails[selectedApartmentType].size}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: colors.light }}>
                              Amenities:
                            </Typography>
                            <List>
                              {apartmentDetails[selectedApartmentType].amenities.map((amenity, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>{amenityIcons[amenity]}</ListItemIcon>
                                  <ListItemText primary={amenity} sx={{ color: colors.light }} />
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
                        disabled={!selectedApartmentType}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((roomNumber) => (
                              <Chip key={roomNumber} label={roomNumber} sx={{ backgroundColor: colors.primary, color: colors.light }} />
                            ))}
                          </Box>
                        )}
                        sx={{ backgroundColor: colors.dark, color: colors.light }}
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
                    {selectedRooms.length > 0 &&
                      selectedRooms.map((roomNumber) => (
                        <Typography key={roomNumber} sx={{ color: colors.light }}>
                          {availableRooms.find((room) => room.roomNumber === roomNumber)?.price}
                        </Typography>
                      ))}
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                    <FormControl fullWidth>
                      <Select
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        displayEmpty
                        sx={{ backgroundColor: colors.dark, color: colors.light }}
                      >
                        {Array.from({ length: 6 }, (_, i) => {
                          const optionValue = i + 1;
                          return (
                            <MenuItem key={optionValue} value={optionValue} sx={{ backgroundColor: colors.mediumDark, color: colors.light }}>
                              {optionValue}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                    {selectedRooms.length > 0 && (
                      <Box>
                        {selectedRooms.map((roomNumber) => (
                          <Typography key={roomNumber} sx={{ color: colors.light }}>
                            {selectedApartmentType} - {roomNumber}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    {selectedRooms.length > 0 && (
                      <Box>
                        <Button
                          variant="contained"
                          onClick={handleReserve}
                          onMouseEnter={handleReservePopoverOpen}
                          onMouseLeave={handleReservePopoverClose}
                          sx={{ backgroundColor: colors.primary, color: colors.light }}
                        >
                          I Will Reserve
                        </Button>
                        <Popover
                          open={reservePopoverOpen}
                          anchorEl={reservePopoverAnchorEl}
                          onClose={handleReservePopoverClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                          disableRestoreFocus
                          sx={{ pointerEvents: 'none' }}
                        >
                          <Box sx={{ p: 2, backgroundColor: colors.mediumDark, color: colors.light }}>
                            <Typography variant="body1">
                              <strong>Hotel Name:</strong> Your Hotel Name
                            </Typography>
                            <Typography variant="body1">
                              <strong>Apartment Type:</strong> {selectedApartmentType}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Check-in Date:</strong> {checkInDate ? checkInDate.format('MM/DD/YYYY') : 'Not selected'}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Check-out Date:</strong> {checkOutDate ? checkOutDate.format('MM/DD/YYYY') : 'Not selected'}
                            </Typography>
                          </Box>
                        </Popover>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Availability;