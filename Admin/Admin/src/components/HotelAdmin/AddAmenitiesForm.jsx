import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import { FixedSizeList } from 'react-window';
import { debounce } from 'lodash';
import axios from 'axios';

const AddAmenitiesForm = () => {
  const [amenities, setAmenities] = useState([]); // List of amenities
  const [newAmenity, setNewAmenity] = useState({ name: '', description: '', icon: '' });
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const muiIcons = useMemo(() => {
    return Object.keys(MuiIcons).map((iconName) => ({
      name: iconName,
      component: MuiIcons[iconName],
    }));
  }, []);

  // Fetch existing amenities on mount
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:2000/api/amenities', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.data && response.data.data.length > 0) {
          setAmenities(response.data.data);
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching amenities:', error.response?.data || error.message);
      }
    };

    fetchAmenities();
  }, []);

  const handleSearch = debounce((query) => {
    setIconSearchQuery(query);
  }, 300);

  const filteredIcons = useMemo(() => {
    return muiIcons.filter((icon) =>
      icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase())
    );
  }, [iconSearchQuery, muiIcons]);

  const handleAddAmenity = () => {
    if (newAmenity.name.trim() && newAmenity.description.trim() && newAmenity.icon) {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity({ name: '', description: '', icon: '' });
      setIconSearchQuery('');
    } else {
      alert('Please fill in all fields for the new amenity');
    }
  };

  const handleDeleteAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await axios.post(
        'http://localhost:2000/api/amenities',
        { amenities }, // Send the entire list
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      alert(isEditing ? 'Amenities updated successfully' : 'Amenities added successfully');
      setIsEditing(true); // Switch to update mode after first save
    } catch (error) {
      console.error('Error adding/updating amenities:', error.response?.data || error.message);
      alert('Failed to save amenities');
    }
  };

  const clearIcon = () => {
    setNewAmenity({ ...newAmenity, icon: '' });
  };

  const IconItem = ({ index, style }) => {
    const icon = filteredIcons[index];
    const IconComponent = icon.component;
    return (
      <Button
        style={style}
        variant={newAmenity.icon === icon.name ? 'contained' : 'outlined'}
        onClick={() => setNewAmenity({ ...newAmenity, icon: icon.name })}
        sx={{
          minWidth: 'auto',
          padding: 1,
          borderRadius: 1,
          color: newAmenity.icon === icon.name ? '#EEEEEE' : '#00ADB5',
          backgroundColor: newAmenity.icon === icon.name ? '#00ADB5' : 'transparent',
          '&:hover': {
            backgroundColor: '#008B8B',
            color: '#EEEEEE',
          },
        }}
      >
        <IconComponent />
      </Button>
    );
  };

  const SelectedIconComponent = newAmenity.icon ? MuiIcons[newAmenity.icon] : null;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
        {isEditing ? 'Update Amenities' : 'Add New Amenities'}
      </Typography>

      {/* Form to add a new amenity */}
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amenity Name"
              variant="outlined"
              value={newAmenity.name}
              onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amenity Description"
              variant="outlined"
              value={newAmenity.description}
              onChange={(e) => setNewAmenity({ ...newAmenity, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Icon"
              variant="outlined"
              value={iconSearchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {SelectedIconComponent ? (
                      <IconButton onClick={clearIcon} sx={{ padding: 0 }}>
                        <SelectedIconComponent />
                      </IconButton>
                    ) : (
                      <SearchIcon />
                    )}
                  </InputAdornment>
                ),
                endAdornment: SelectedIconComponent && (
                  <InputAdornment position="end">
                    <IconButton onClick={clearIcon}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                marginTop: 2,
                height: 200,
                border: '1px solid #393E46',
                borderRadius: 1,
                padding: 2,
              }}
            >
              <FixedSizeList
                height={180}
                width="100%"
                itemSize={50}
                itemCount={filteredIcons.length}
              >
                {IconItem}
              </FixedSizeList>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddAmenity}
              sx={{
                backgroundColor: '#00ADB5',
                '&:hover': { backgroundColor: '#008B8B' },
              }}
            >
              Add to List
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Display current list of amenities */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
          Current Amenities
        </Typography>
        {amenities.length === 0 ? (
          <Typography sx={{ color: '#EEEEEE' }}>No amenities added yet.</Typography>
        ) : (
          <List>
            {amenities.map((amenity, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #393E46' }}>
                <ListItemText
                  primary={amenity.name}
                  secondary={amenity.description}
                  primaryTypographyProps={{ color: '#EEEEEE' }}
                  secondaryTypographyProps={{ color: '#AAAAAA' }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteAmenity(index)}
                    sx={{ color: '#FF4444' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Submit the entire list */}
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#00ADB5',
            '&:hover': { backgroundColor: '#008B8B' },
          }}
        >
          {isEditing ? 'Update Amenities' : 'Save Amenities'}
        </Button>
      </form>
    </Box>
  );
};

export default AddAmenitiesForm;