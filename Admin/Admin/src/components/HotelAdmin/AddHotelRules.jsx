import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';

const HotelRules = () => {
  const [checkInFrom, setCheckInFrom] = useState('14:00');
  const [checkInTo, setCheckInTo] = useState('00:00');
  const [checkOutFrom, setCheckOutFrom] = useState('07:00');
  const [checkOutTo, setCheckOutTo] = useState('12:00');
  const [cancellationPolicy, setCancellationPolicy] = useState(
    'Cancellation and prepayment policies vary according to accommodation type. Please check what conditions may apply to each option when making your selection.'
  );
  const [childPolicies, setChildPolicies] = useState([
    'Children of any age are welcome.',
    'Children 12 years and above will be charged as adults at this property.',
    'To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.',
  ]);
  const [cotAndExtraBedPolicies, setCotAndExtraBedPolicies] = useState([
    '0 - 2 years: Extra bed upon request: US$15 per child, per night. Cot upon request: Free',
    '3 - 12 years: Extra bed upon request: US$15 per child, per night',
    '13+ years: Extra bed upon request: US$20 per person, per night',
    'Prices for cots and extra beds are not included in the total price, and will have to be paid for separately during your stay.',
    'The number of extra beds and cots allowed is dependent on the option you choose. Please check your selected option for more information.',
    'All cots and extra beds are subject to availability.',
  ]);
  const [noAgeRestriction, setNoAgeRestriction] = useState(true);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [acceptedCards, setAcceptedCards] = useState(['Visa', 'MasterCard', 'American Express']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/hotel-rules', { // Use your backend URL
        checkIn: `From ${checkInFrom} to ${checkInTo}`,
        checkOut: `From ${checkOutFrom} to ${checkOutTo}`,
        cancellationPolicy,
        childPolicies,
        cotAndExtraBedPolicies,
        noAgeRestriction,
        petsAllowed,
        acceptedCards,
      });
      alert('Hotel rules saved successfully!');
    } catch (error) {
      console.error('Error saving hotel rules:', error);
      alert('Failed to save hotel rules.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
        Hotel Rules
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Check-in/Check-out */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
              Check-in/Check-out
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check-in From"
                  variant="outlined"
                  value={checkInFrom}
                  onChange={(e) => setCheckInFrom(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check-in To"
                  variant="outlined"
                  value={checkInTo}
                  onChange={(e) => setCheckInTo(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check-out From"
                  variant="outlined"
                  value={checkOutFrom}
                  onChange={(e) => setCheckOutFrom(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check-out To"
                  variant="outlined"
                  value={checkOutTo}
                  onChange={(e) => setCheckOutTo(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Cancellation/Prepayment */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
              Cancellation/Prepayment
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Cancellation/Prepayment Policy"
              variant="outlined"
              value={cancellationPolicy}
              onChange={(e) => setCancellationPolicy(e.target.value)}
              required
            />
          </Grid>

          {/* Children and Beds */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
              Children and Beds
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Child Policies"
              variant="outlined"
              value={childPolicies.join('\n')}
              onChange={(e) => setChildPolicies(e.target.value.split('\n'))}
              required
            />
          </Grid>

          {/* Cot and Extra Bed Policies */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
              Cot and Extra Bed Policies
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Cot and Extra Bed Policies"
              variant="outlined"
              value={cotAndExtraBedPolicies.join('\n')}
              onChange={(e) => setCotAndExtraBedPolicies(e.target.value.split('\n'))}
              required
            />
          </Grid>

          {/* No Age Restriction */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={noAgeRestriction}
                  onChange={(e) => setNoAgeRestriction(e.target.checked)}
                  color="primary"
                />
              }
              label="No Age Restriction"
            />
          </Grid>

          {/* Pets Allowed */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petsAllowed}
                  onChange={(e) => setPetsAllowed(e.target.checked)}
                  color="primary"
                />
              }
              label="Pets Allowed"
            />
          </Grid>

          {/* Cards Accepted */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
              Cards Accepted at this Hotel
            </Typography>
            <TextField
              fullWidth
              label="Accepted Cards (comma-separated)"
              variant="outlined"
              value={acceptedCards.join(', ')}
              onChange={(e) => setAcceptedCards(e.target.value.split(',').map((card) => card.trim()))}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#00ADB5',
                '&:hover': { backgroundColor: '#008B8B' },
              }}
            >
              Save Hotel Rules
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default HotelRules;