import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material'; // Import all MUI icons

const Amenities = () => {
  // Sample data to display
  const [amenitiesList, setAmenitiesList] = useState([
    {
      name: 'Swimming Pool',
      description: 'Enjoy a refreshing swim in our pool.',
      icon: 'Pool',
    },
    {
      name: 'Gym',
      description: 'Stay fit with our state-of-the-art gym equipment.',
      icon: 'FitnessCenter',
    },
    {
      name: 'Wi-Fi',
      description: 'High-speed internet access throughout the property.',
      icon: 'Wifi',
    },
  ]);

  // Function to add a new amenity
  const handleAddAmenity = (newAmenity) => {
    setAmenitiesList([...amenitiesList, newAmenity]);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Display the list of added amenities */}
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h5" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 2 }}>
          Amenities
        </Typography>
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
      </Box>

      {/* Add Amenities Form */}
    
    </Box>
  );
};

export default Amenities;