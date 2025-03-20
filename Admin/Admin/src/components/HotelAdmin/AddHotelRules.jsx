import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Switch,
  Button,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';

const HotelRules = () => {
  const [hotelRules, setHotelRules] = useState({
    checkIn: '',
    checkOut: '',
    cancellationPolicy: '',
    childPolicies: [],
    cotAndExtraBedPolicies: [],
    noAgeRestriction: false,
    petsAllowed: false,
    acceptedCards: [],
  });

  const [newChildPolicy, setNewChildPolicy] = useState('');
  const [newCotPolicy, setNewCotPolicy] = useState('');
  const [newCard, setNewCard] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchHotelRules = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:2000/api/hotel-rules', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.data) {
          setHotelRules(response.data.data);
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching hotel rules:', error.response?.data || error.message);
      }
    };

    fetchHotelRules();
  }, []);

  const handleChange = (field) => (event) => {
    setHotelRules({ ...hotelRules, [field]: event.target.value });
  };

  const handleSwitchChange = (field) => (event) => {
    setHotelRules({ ...hotelRules, [field]: event.target.checked });
  };

  const addChildPolicy = () => {
    if (newChildPolicy.trim()) {
      setHotelRules({
        ...hotelRules,
        childPolicies: [...hotelRules.childPolicies, newChildPolicy],
      });
      setNewChildPolicy('');
    }
  };

  const addCotPolicy = () => {
    if (newCotPolicy.trim()) {
      setHotelRules({
        ...hotelRules,
        cotAndExtraBedPolicies: [...hotelRules.cotAndExtraBedPolicies, newCotPolicy],
      });
      setNewCotPolicy('');
    }
  };

  const addAcceptedCard = () => {
    if (newCard.trim()) {
      setHotelRules({
        ...hotelRules,
        acceptedCards: [...hotelRules.acceptedCards, newCard],
      });
      setNewCard('');
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await axios.post('http://localhost:2000/api/hotel-rules', hotelRules, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.message);
      setIsEditing(true);
    } catch (error) {
      console.error('Error submitting hotel rules:', error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
        Set Hotel Rules
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Check-in/Check-out
        </Typography>
        <TextField
          label="Check-in Time"
          value={hotelRules.checkIn}
          onChange={handleChange('checkIn')}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Check-out Time"
          value={hotelRules.checkOut}
          onChange={handleChange('checkOut')}
          fullWidth
          multiline
          rows={4}
        />
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Cancellation/Prepayment
        </Typography>
        <TextField
          label="Cancellation Policy"
          value={hotelRules.cancellationPolicy}
          onChange={handleChange('cancellationPolicy')}
          fullWidth
          multiline
          rows={4}
        />
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Children and Beds
        </Typography>
        <List>
          {hotelRules.childPolicies.map((policy, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemText primary={policy} primaryTypographyProps={{ color: '#EEEEEE' }} />
            </ListItem>
          ))}
        </List>
        <TextField
          label="Add Child Policy"
          value={newChildPolicy}
          onChange={(e) => setNewChildPolicy(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={addChildPolicy}>
          Add Policy
        </Button>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Cot and Extra Bed Policies
        </Typography>
        <List>
          {hotelRules.cotAndExtraBedPolicies.map((policy, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemText primary={policy} primaryTypographyProps={{ color: '#EEEEEE' }} />
            </ListItem>
          ))}
        </List>
        <TextField
          label="Add Cot/Extra Bed Policy"
          value={newCotPolicy}
          onChange={(e) => setNewCotPolicy(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={addCotPolicy}>
          Add Policy
        </Button>
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          No Age Restriction
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={hotelRules.noAgeRestriction}
              onChange={handleSwitchChange('noAgeRestriction')}
            />
          }
          label={hotelRules.noAgeRestriction ? 'Yes' : 'No'}
          sx={{ color: '#EEEEEE' }}
        />
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Pets Allowed
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={hotelRules.petsAllowed}
              onChange={handleSwitchChange('petsAllowed')}
            />
          }
          label={hotelRules.petsAllowed ? 'Yes' : 'No'}
          sx={{ color: '#EEEEEE' }}
        />
      </Box>

      <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Cards Accepted at this Hotel
        </Typography>
        <List>
          {hotelRules.acceptedCards.map((card, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemText primary={card} primaryTypographyProps={{ color: '#EEEEEE' }} />
            </ListItem>
          ))}
        </List>
        <TextField
          label="Add Accepted Card"
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={addAcceptedCard}>
          Add Card
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isEditing ? 'Update Hotel Rules' : 'Save Hotel Rules'}
      </Button>
    </Box>
  );
};

export default HotelRules;