import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const HotelRulesDetail = () => {
  // Sample hotel rules data
  const hotelRules = {
    checkIn: 'From 14:00 to 00:00',
    checkOut: 'From 07:00 to 12:00',
    cancellationPolicy:
      'Cancellation and prepayment policies vary according to accommodation type. Please check what conditions may apply to each option when making your selection.',
    childPolicies: [
      'Children of any age are welcome.',
      'Children 12 years and above will be charged as adults at this property.',
      'To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.',
    ],
    cotAndExtraBedPolicies: [
      '0 - 2 years: Extra bed upon request: US$15 per child, per night. Cot upon request: Free',
      '3 - 12 years: Extra bed upon request: US$15 per child, per night',
      '13+ years: Extra bed upon request: US$20 per person, per night',
      'Prices for cots and extra beds are not included in the total price, and will have to be paid for separately during your stay.',
      'The number of extra beds and cots allowed is dependent on the option you choose. Please check your selected option for more information.',
      'All cots and extra beds are subject to availability.',
    ],
    noAgeRestriction: true,
    petsAllowed: false,
    acceptedCards: ['Visa', 'MasterCard', 'American Express'],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
        Hotel Rules
      </Typography>

      {/* Check-in/Check-out */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Check-in/Check-out
        </Typography>
        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
          <strong>Check-in:</strong> {hotelRules.checkIn}
        </Typography>
        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
          <strong>Check-out:</strong> {hotelRules.checkOut}
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      {/* Cancellation/Prepayment */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Cancellation/Prepayment
        </Typography>
        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
          {hotelRules.cancellationPolicy}
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      {/* Children and Beds */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Children and Beds
        </Typography>
        <List>
          {hotelRules.childPolicies.map((policy, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemText
                primary={policy}
                primaryTypographyProps={{ color: '#EEEEEE' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      {/* Cot and Extra Bed Policies */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Cot and Extra Bed Policies
        </Typography>
        <List>
          {hotelRules.cotAndExtraBedPolicies.map((policy, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemText
                primary={policy}
                primaryTypographyProps={{ color: '#EEEEEE' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      {/* No Age Restriction */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          No Age Restriction
        </Typography>
        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
          {hotelRules.noAgeRestriction ? 'Yes' : 'No'}
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      {/* Pets Allowed */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Pets Allowed
        </Typography>
        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
          {hotelRules.petsAllowed ? 'Yes' : 'No'}
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      {/* Cards Accepted */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Cards Accepted at this Hotel
        </Typography>
        <List>
          {hotelRules.acceptedCards.map((card, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemText
                primary={card}
                primaryTypographyProps={{ color: '#EEEEEE' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default HotelRulesDetail;