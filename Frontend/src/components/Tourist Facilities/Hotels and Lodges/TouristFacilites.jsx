import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'; // Changed to @mui/material

import { styled } from '@mui/material/styles'; // For styling in v5 (preferred)

const FilterSection = styled('div')(({ theme }) => ({  // Styled component
  margin: theme.spacing(3, 0),
}));

const FacilityCard = styled(Card)(({ theme }) => ({  // Styled component
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const Media = styled(CardMedia)(({ theme }) => ({  // Styled component
  height: 200,
}));

const DialogImage = styled('img')(({ theme }) => ({ // Styled component
  width: '100%',
  height: 300,
  objectFit: 'cover',
}));


const facilities = [
  // ... (Your facility data remains the same)
];

export default function BookingPage() {
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking details:', bookingDetails);
    setSelectedFacility(null);
  };

  const filteredFacilities = facilities.filter((facility) => {
    const locationMatch = locationFilter ? facility.location === locationFilter : true;
    const typeMatch = typeFilter ? facility.type === typeFilter : true;
    return locationMatch && typeMatch;
  });

  return (
    <Container>
      <FilterSection> {/* Use the styled component */}
        <Grid container spacing={3}>
          {/* ... (Your filter form remains largely the same) */}
        </Grid>
      </FilterSection>

      <Grid container spacing={3}>
        {filteredFacilities.map((facility) => (
          <Grid item xs={12} sm={6} md={4} key={facility.id}>
            <FacilityCard onClick={() => setSelectedFacility(facility)}> {/* Use styled component */}
              <Media image={facility.image} title={facility.name} /> {/* Use styled component */}
              <CardContent>
                {/* ... (Card content remains the same) */}
              </CardContent>
            </FacilityCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={Boolean(selectedFacility)}
        onClose={() => setSelectedFacility(null)}
        maxWidth="md"
      >
        {selectedFacility && (
          <>
            <DialogTitle>{selectedFacility.name}</DialogTitle>
            <DialogContent>
              <DialogImage src={selectedFacility.image} alt={selectedFacility.name} /> {/* Use styled component */}
              {/* ... (Dialog content remains the same) */}
            </DialogContent>
            <DialogActions>
              {/* ... (Dialog actions remain the same) */}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}