import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components for better organization and reusability
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  color: '#333',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  color: '#444',
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color: '#666',
  lineHeight: 1.6,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

const Rules = () => {
  return (
    <StyledBox>
      <StyledTitle variant="h4">
        House Rules
        <Link href="#" underline="hover" sx={{ color: 'primary.main' }}>
          Availability
        </Link>
      </StyledTitle>

      <StyledText variant="body1" gutterBottom>
        AYA Addis Hotel takes special requests - add in the next step!
      </StyledText>

      <StyledDivider />

      <StyledSectionTitle variant="h6">Check-in/Check-out</StyledSectionTitle>
      <List>
        <StyledListItem disablePadding>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">Check-in:</Typography>
            <Typography>From 14:00 to 00:00</Typography>
          </Box>
        </StyledListItem>
        <StyledListItem disablePadding>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">Check-out:</Typography>
            <Typography>From 07:00 to 12:00</Typography>
          </Box>
        </StyledListItem>
      </List>

      <StyledDivider />

      <StyledSectionTitle variant="h6">Cancellation/Prepayment</StyledSectionTitle>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography fontWeight="bold">Cancellation/Prepayment:</Typography>
        <StyledText variant="body1" style={{ flex: 1, marginLeft: '16px' }}>
          Cancellation and prepayment policies vary according to accommodation type. Please check what conditions may apply to each option when making your selection.
        </StyledText>
      </Box>

      <StyledDivider />

      <StyledSectionTitle variant="h6">Children and Beds</StyledSectionTitle>
      <StyledSectionTitle variant="subtitle1">Child Policies</StyledSectionTitle>
      <StyledText variant="body1" gutterBottom>
        Children of any age are welcome.
      </StyledText>
      <StyledText variant="body1" gutterBottom>
        Children 12 years and above will be charged as adults at this property.
      </StyledText>
      <StyledText variant="body1" gutterBottom>
        To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.
      </StyledText>

      <StyledSectionTitle variant="subtitle1">Cot and Extra Bed Policies</StyledSectionTitle>
      <List>
        <StyledListItem disablePadding>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">0 - 2 years:</Typography>
            <Typography>Extra bed upon request: US$15 per child, per night. Cot upon request: Free</Typography>
          </Box>
        </StyledListItem>
        <StyledListItem disablePadding>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">3 - 12 years:</Typography>
            <Typography>Extra bed upon request: US$15 per child, per night</Typography>
          </Box>
        </StyledListItem>
        <StyledListItem disablePadding>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">13+ years:</Typography>
            <Typography>Extra bed upon request: US$20 per person, per night</Typography>
          </Box>
        </StyledListItem>
      </List>
      <StyledText variant="body1" gutterBottom>
        Prices for cots and extra beds are not included in the total price, and will have to be paid for separately during your stay.
      </StyledText>
      <StyledText variant="body1" gutterBottom>
        The number of extra beds and cots allowed is dependent on the option you choose. Please check your selected option for more information.
      </StyledText>
      <StyledText variant="body1" gutterBottom>
        All cots and extra beds are subject to availability.
      </StyledText>

      <StyledDivider />

      <StyledSectionTitle variant="h6">No Age Restriction</StyledSectionTitle>
      <StyledText variant="body1" gutterBottom>
        There is no age requirement for check-in.
      </StyledText>

      <StyledDivider />

      <StyledSectionTitle variant="h6">Pets</StyledSectionTitle>
      <StyledText variant="body1" gutterBottom>
        Pets are not allowed.
      </StyledText>

      <StyledDivider />

      <StyledSectionTitle variant="h6">Cards Accepted at this Hotel</StyledSectionTitle>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography fontWeight="bold">Cards Accepted at this Hotel:</Typography>
        <StyledText variant="body1" style={{ flex: 1, marginLeft: '16px' }}>
          (Cards icons here - you'd need to add the card icons if needed) Cash is not accepted
        </StyledText>
      </Box>
    </StyledBox>
  );
};

export default Rules;