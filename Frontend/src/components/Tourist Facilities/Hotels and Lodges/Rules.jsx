import React from 'react';
import { Box, Typography, List, ListItem, Divider, Link, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CreditCard,
  Pets,
  ChildFriendly,
  Bed,
  AccessTime,
  LocalHotel,
  Cancel,
  Payment,
} from '@mui/icons-material'; // Import icons

// Color Palette
const colors = {
  dark: '#222831', // Dark Gray
  mediumDark: '#393E46', // Medium Gray
  primary: '#00ADB5', // Teal
  light: '#F5F5F5', // Light Gray (Updated Background)
  white: '#FFFFFF', // White
};

// Styled Components
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: colors.white,
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '1100px',
  margin: '0 auto',
  marginBottom: 30,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: colors.dark,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: colors.dark,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color: colors.mediumDark,
  lineHeight: 1.6,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: colors.primary,
    borderRadius: theme.spacing(1),
    '& .MuiTypography-root': {
      color: colors.white,
    },
    '& .MuiAvatar-root': {
      backgroundColor: colors.white,
      '& .MuiSvgIcon-root': {
        color: colors.primary,
      },
    },
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  backgroundColor: colors.primary,
}));

const Rules = () => {
  return (
    <Box sx={{ backgroundColor: colors.light, p: 4 }}>
      <StyledBox>
        <StyledTitle variant="h4">
          House Rules
          <Link href="#" underline="hover" sx={{ color: colors.primary }}>
            Availability
          </Link>
        </StyledTitle>

        <StyledText variant="body1" gutterBottom>
          AYA Addis Hotel takes special requests - add in the next step!
        </StyledText>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <AccessTime sx={{ color: colors.white }} />
          </Avatar>
          Check-in/Check-out
        </StyledSectionTitle>
        <List>
          <StyledListItem disablePadding>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography fontWeight="bold" color={colors.dark}>
                Check-in:
              </Typography>
              <Typography color={colors.mediumDark}>From 14:00 to 00:00</Typography>
            </Box>
          </StyledListItem>
          <StyledListItem disablePadding>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography fontWeight="bold" color={colors.dark}>
                Check-out:
              </Typography>
              <Typography color={colors.mediumDark}>From 07:00 to 12:00</Typography>
            </Box>
          </StyledListItem>
        </List>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <Cancel sx={{ color: colors.white }} />
          </Avatar>
          Cancellation/Prepayment
        </StyledSectionTitle>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography fontWeight="bold" color={colors.dark}>
            Cancellation/Prepayment:
          </Typography>
          <StyledText variant="body1" style={{ flex: 1, marginLeft: '16px' }}>
            Cancellation and prepayment policies vary according to accommodation type. Please check what conditions may apply to each option when making your selection.
          </StyledText>
        </Box>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <ChildFriendly sx={{ color: colors.white }} />
          </Avatar>
          Children and Beds
        </StyledSectionTitle>
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
              <Typography fontWeight="bold" color={colors.dark}>
                0 - 2 years:
              </Typography>
              <Typography color={colors.mediumDark}>
                Extra bed upon request: US$15 per child, per night. Cot upon request: Free
              </Typography>
            </Box>
          </StyledListItem>
          <StyledListItem disablePadding>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography fontWeight="bold" color={colors.dark}>
                3 - 12 years:
              </Typography>
              <Typography color={colors.mediumDark}>
                Extra bed upon request: US$15 per child, per night
              </Typography>
            </Box>
          </StyledListItem>
          <StyledListItem disablePadding>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography fontWeight="bold" color={colors.dark}>
                13+ years:
              </Typography>
              <Typography color={colors.mediumDark}>
                Extra bed upon request: US$20 per person, per night
              </Typography>
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

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <LocalHotel sx={{ color: colors.white }} />
          </Avatar>
          No Age Restriction
        </StyledSectionTitle>
        <StyledText variant="body1" gutterBottom>
          There is no age requirement for check-in.
        </StyledText>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <Pets sx={{ color: colors.white }} />
          </Avatar>
          Pets
        </StyledSectionTitle>
        <StyledText variant="body1" gutterBottom>
          Pets are not allowed.
        </StyledText>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <Payment sx={{ color: colors.white }} />
          </Avatar>
          Cards Accepted at this Hotel
        </StyledSectionTitle>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography fontWeight="bold" color={colors.dark}>
            Cards Accepted at this Hotel:
          </Typography>
          <StyledText variant="body1" style={{ flex: 1, marginLeft: '16px' }}>
            (Cards icons here - you'd need to add the card icons if needed) Cash is not accepted
          </StyledText>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default Rules;