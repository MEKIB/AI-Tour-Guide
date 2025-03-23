import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
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

        setFacilities(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load facilities');
      } finally {
        setLoading(false);
      }
    };

    if (hotelAdminId) fetchFacilities();
  }, [hotelAdminId]);

  if (loading) return <Typography>Loading facilities...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ color: '#00ADB5', mb: 2 }}>
        Facilities at {hotelName}
      </Typography>
      {facilities.length > 0 ? (
        <List>
          {facilities.map((facility, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <StarIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              <ListItemText primary={facility.name} secondary={facility.description} sx={{ color: '#EEEEEE' }} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No facilities available for this hotel.</Typography>
      )}
    </Box>
  );
};

export default Facilities;