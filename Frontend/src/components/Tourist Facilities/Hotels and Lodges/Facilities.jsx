import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import axios from 'axios';

const Facilities = ({ hotelAdminId, hotelName }) => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        if (!hotelAdminId) throw new Error('Hotel Admin ID is required');

        const response = await axios.get('http://localhost:2000/api/amenities/by-hotel', {
          params: { hotelAdminId },
        });

        console.log('Facilities fetched:', response.data.data);
        setFacilities(response.data.data || []);
      } catch (err) {
        console.error('Error fetching facilities:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to load facilities');
      } finally {
        setLoading(false);
      }
    };

    if (hotelAdminId) fetchFacilities();
  }, [hotelAdminId]);

  if (loading) return <Typography sx={{ color: '#EEEEEE' }}>Loading facilities...</Typography>;
  if (error) return <Typography sx={{ color: '#FF6B6B' }}>{error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ color: '#00ADB5', mb: 2, fontWeight: 'bold' }}>
        Facilities at {hotelName}
      </Typography>
      {facilities.length > 0 ? (
        <List>
          {facilities.map((facility, index) => {
            const IconComponent = MuiIcons[facility.icon] || MuiIcons.Star; // Fallback to StarIcon
            console.log('Facility icon:', facility.icon); // Debug icon name
            return (
              <ListItem key={index} sx={{ borderBottom: '1px solid #393E46', py: 1 }}>
                <ListItemIcon>
                  <IconComponent sx={{ color: '#00ADB5' }} />
                </ListItemIcon>
                <ListItemText
                  primary={facility.name}
                  secondary={facility.description}
                  primaryTypographyProps={{ color: '#EEEEEE', fontWeight: 'medium' }}
                  secondaryTypographyProps={{ color: '#AAAAAA' }}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography sx={{ color: '#EEEEEE' }}>No facilities available for this hotel.</Typography>
      )}
    </Box>
  );
};

export default Facilities;