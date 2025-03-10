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
  Chip, // Import Chip for displaying selected rooms
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
  'Private kitchen': <KitchenIcon />,
  Balcony: <BalconyIcon />,
  'Mountain view': <LandscapeIcon />,
  'City view': <LandscapeIcon />,
  Patio: <LandscapeIcon />,
  'Flat-screen TV': <TvIcon />,
  'Free Wifi': <WifiIcon />,
  'Free toiletries': <CleaningIcon />,
  'Kitchen with washing machine': <LaundryIcon />,
  Sofa: <ChairIcon />,
  'Bathtub or shower': <BathtubIcon />,
  'Towels and linens provided': <BedIcon />,
  'Socket near the bed': <CoffeeIcon />,
  'Cleaning products': <CleaningIcon />,
  'Tile/Marble floor': <ChairIcon />,
  'Sitting area': <ChairIcon />,
  Slippers: <ChairIcon />,
  Refrigerator: <KitchenIcon />,
  'Ironing facilities': <CleaningIcon />,
  'Tea/Coffee maker': <CoffeeIcon />,
  Iron: <CleaningIcon />,
  'Interconnecting room(s) available': <ChairIcon />,
  Microwave: <MicrowaveIcon />,
  Hairdryer: <DryCleaningIcon />,
  Kitchenware: <KitchenIcon />,
  Kitchenette: <KitchenIcon />,
  'Guest bathroom': <BathtubIcon />,
  'Carpeted flooring': <ChairIcon />,
  'Electric kettle': <CoffeeIcon />,
  'Alarm clock': <CoffeeIcon />,
  Oven: <KitchenIcon />,
  Stovetop: <KitchenIcon />,
  Toaster: <KitchenIcon />,
  'Dining area': <DiningIcon />,
  'Upper floors accessible by stairs only': <ElevatorIcon />,
  'Private apartment in building': <ChairIcon />,
  'Clothes rack': <ChairIcon />,
  'Drying rack for clothing': <LaundryIcon />,
  'Toilet paper': <CleaningIcon />,
  'Hand sanitizer': <CleaningIcon />,
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
  const [selectedRooms, setSelectedRooms] = useState([]); // Array for multiple room selections
  const [selectedApartmentType, setSelectedApartmentType] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

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
  const [reservePopoverAnchorEl, setReservePopoverAnchorEl] = useState(null);

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
    setSelectedRooms([]); // Reset selected rooms when apartment type changes
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
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Select dates to see this property's availability and prices
      </Typography>
      <Typography variant="body2" gutterBottom>
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
                  <IconButton onClick={handleOpenCalendar}>
                    <CalendarMonthIcon />
                  </IconButton>
                ),
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
            <Box sx={{ display: 'flex', p: 2 }}>
              <Box sx={{ marginRight: 2 }}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Check-in
                </Typography>
                <DateCalendar
                  value={checkInDate}
                  onChange={(newValue) => setCheckInDate(newValue)}
                  minDate={dayjs()}
                  disableHighlightToday
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Check-out
                </Typography>
                <DateCalendar
                  value={checkOutDate}
                  onChange={(newValue) => setCheckOutDate(newValue)}
                  minDate={checkInDate || dayjs()}
                  disableHighlightToday
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
                  <IconButton onClick={handleOpenGuestPopover}>
                    <ArrowDropDownIcon />
                  </IconButton>
                ),
              }}
            />
            <Popover
              open={Boolean(guestPopoverAnchorEl)}
              anchorEl={guestPopoverAnchorEl}
              onClose={handleCloseGuestPopover}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <Box sx={{ p: 6, width: '300px', position: 'relative' }}>
                <IconButton
                  sx={{
                    backgroundColor: '#143D60',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    paddingBottom: '8px',
                  }}
                  onClick={handleForceCloseGuestPopover}
                >
                  <CloseIcon />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Adults</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleAdultsChange(-1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{adults}</Typography>
                    <IconButton onClick={() => handleAdultsChange(1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Children</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleChildrenChange(-1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{children}</Typography>
                    <IconButton onClick={() => handleChildrenChange(1)}>
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
                            sx={{ width: '100px' }}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              Select age
                            </MenuItem>
                            {[...Array(18)].map((_, i) => (
                              <MenuItem key={i} value={i}>
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
                    <IconButton onClick={() => handleRoomsChange(-1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{rooms}</Typography>
                    <IconButton onClick={() => handleRoomsChange(1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Button variant="contained" fullWidth onClick={handleCloseGuestPopover}>
                  Done
                </Button>
              </Box>
            </Popover>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>

      {/* Display Available Rooms and Booking Form */}
      {showBookingForm && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Available Rooms
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#3572EF' }}>
                <TableRow>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>Apartment Type</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>Room Number</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>Price</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>Number of Apartments</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>Your Choice</TableCell>
                  <TableCell></TableCell>
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
                      >
                        <MenuItem value="" disabled>
                          Select Apartment Type
                        </MenuItem>
                        {apartmentTypes.map((type, index) => (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {selectedApartmentType && (
                        <Box sx={{ mt: 4 }}>
                          <Typography variant="h6" gutterBottom>
                            {selectedApartmentType} Details
                          </Typography>
                          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Bedrooms:
                            </Typography>
                            <List>
                              {apartmentDetails[selectedApartmentType].bedrooms.map((bedroom, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={`${bedroom.name}: ${bedroom.beds}`} />
                                </ListItem>
                              ))}
                            </List>
                            <Typography variant="subtitle1" gutterBottom>
                              Bathrooms: {apartmentDetails[selectedApartmentType].bathrooms}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Size: {apartmentDetails[selectedApartmentType].size}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Amenities:
                            </Typography>
                            <List>
                              {apartmentDetails[selectedApartmentType].amenities.map((amenity, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>{amenityIcons[amenity]}</ListItemIcon>
                                  <ListItemText primary={amenity} />
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
                        multiple // Enable multiple selections
                        value={selectedRooms}
                        onChange={handleRoomSelection}
                        displayEmpty
                        disabled={!selectedApartmentType}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((roomNumber) => (
                              <Chip key={roomNumber} label={roomNumber} />
                            ))}
                          </Box>
                        )}
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
                        <Typography key={roomNumber}>
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
                      >
                        {Array.from({ length: 6 }, (_, i) => {
                          const optionValue = i + 1;
                          return (
                            <MenuItem key={optionValue} value={optionValue}>
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
                          <Typography key={roomNumber}>
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
                  sx={{ pointerEvents: 'none' }} // Ensure the popover doesn't block hover
                >
                  <Box sx={{ p: 2 }}>
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