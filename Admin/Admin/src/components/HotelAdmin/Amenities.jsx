import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import axios from 'axios';

const Amenities = () => {
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch amenities from the backend on component mount
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get('http://localhost:2000/api/amenities', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.data && Array.isArray(response.data.data)) {
          // The backend now returns an array of amenities directly
          setAmenitiesList(response.data.data);
        } else {
          setAmenitiesList([]); // No amenities found
        }
      } catch (err) {
        console.error('Error fetching amenities:', err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
          Loading Amenities...
        </Typography>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
          Error
        </Typography>
        <Typography sx={{ color: '#EEEEEE' }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h5" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 2 }}>
          Amenities
        </Typography>
        {amenitiesList.length === 0 ? (
          <Typography sx={{ color: '#EEEEEE' }}>No amenities available yet.</Typography>
        ) : (
          <List>
            {amenitiesList.map((amenity, index) => {
              const IconComponent = MuiIcons[amenity.icon];
              return (
                <ListItem key={index} sx={{ borderBottom: '1px solid #393E46', paddingY: 2 }}>
                  <ListItemIcon sx={{ color: '#00ADB5' }}>
                    {IconComponent ? <IconComponent /> : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={amenity.name}
                    secondary={amenity.description}
                    primaryTypographyProps={{ color: '#EEEEEE', fontWeight: 'bold' }}
                    secondaryTypographyProps={{ color: '#AAAAAA' }}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Amenities;