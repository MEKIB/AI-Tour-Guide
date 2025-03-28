import React, { useState, useEffect } from 'react';
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
} from '@mui/icons-material';
import axios from 'axios';

const colors = {
  dark: '#222831',
  mediumDark: '#393E46',
  primary: '#00ADB5',
  light: '#F5F5F5',
  white: '#FFFFFF',
};

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: colors.white,
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '1100px',
  margin: '0 auto',
  marginBottom: 30,
  [theme.breakpoints.down('md')]: { padding: theme.spacing(3) },
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
    '& .MuiTypography-root': { color: colors.white },
    '& .MuiAvatar-root': {
      backgroundColor: colors.white,
      '& .MuiSvgIcon-root': { color: colors.primary },
    },
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  backgroundColor: colors.primary,
}));

const Rules = ({ hotelAdminId }) => {
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        if (!hotelAdminId) {
          setError('No Hotel Admin ID provided');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:2000/api/hotel-rules/by-hotel', {
          params: { hotelAdminId },
        });

        setRules(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load house rules');
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [hotelAdminId]);

  if (loading) return <Typography>Loading house rules...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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
          {rules ? `${rules.name || 'This hotel'} takes special requests - add in the next step!` : 'Loading hotel info...'}
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
              <Typography fontWeight="bold" color={colors.dark}>Check-in:</Typography>
              <Typography color={colors.mediumDark}>{rules?.checkIn || 'Not specified'}</Typography>
            </Box>
          </StyledListItem>
          <StyledListItem disablePadding>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography fontWeight="bold" color={colors.dark}>Check-out:</Typography>
              <Typography color={colors.mediumDark}>{rules?.checkOut || 'Not specified'}</Typography>
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
          <Typography fontWeight="bold" color={colors.dark}>Cancellation/Prepayment:</Typography>
          <StyledText variant="body1" style={{ flex: 1, marginLeft: '16px' }}>
            {rules?.cancellationPolicy || 'Cancellation and prepayment policies vary according to accommodation type.'}
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
          {rules?.childPolicies || 'Children of any age are welcome.'}
        </StyledText>

        <StyledSectionTitle variant="subtitle1">Cot and Extra Bed Policies</StyledSectionTitle>
        <StyledText variant="body1" gutterBottom>
          {rules?.cotAndExtraBedPolicies || 'Cot and extra bed policies vary by room type.'}
        </StyledText>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <LocalHotel sx={{ color: colors.white }} />
          </Avatar>
          No Age Restriction
        </StyledSectionTitle>
        <StyledText variant="body1" gutterBottom>
          {rules?.noAgeRestriction !== undefined
            ? `There is ${rules.noAgeRestriction ? 'no' : 'an'} age requirement for check-in.`
            : 'There is no age requirement for check-in.'}
        </StyledText>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <Pets sx={{ color: colors.white }} />
          </Avatar>
          Pets
        </StyledSectionTitle>
        <StyledText variant="body1" gutterBottom>
          {rules?.petsAllowed !== undefined
            ? `Pets are ${rules.petsAllowed ? 'allowed' : 'not allowed'}.`
            : 'Pets are not allowed.'}
        </StyledText>

        <StyledDivider />

        <StyledSectionTitle variant="h6">
          <Avatar sx={{ backgroundColor: colors.primary, width: 32, height: 32, mr: 1 }}>
            <Payment sx={{ color: colors.white }} />
          </Avatar>
          Cards Accepted at this Hotel
        </StyledSectionTitle>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography fontWeight="bold" color={colors.dark}>Cards Accepted at this Hotel:</Typography>
          <StyledText variant="body1" style={{ flex: 1, marginLeft: '16px' }}>
            {rules?.acceptedCards || 'Cash is not accepted.'}
          </StyledText>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default Rules;