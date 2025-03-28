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
  Paper,
  Avatar,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import { FixedSizeList } from 'react-window';
import { debounce } from 'lodash';
import axios from 'axios';

// Color palette
const colors = {
  primary: '#00ADB5', // Teal
  secondary: '#393E46', // Dark Gray
  background: '#222831', // Dark Background
  textLight: '#EEEEEE', // Light Text
  textDark: '#222831', // Dark Text
  error: '#FF4444', // Red for errors
  success: '#00C853', // Green for success
  inputBackground: '#2D2D2D', // Darker background for input fields
  inputText: '#EEEEEE', // Light text color for input fields
  inputBorder: '#00ADB5', // Teal border for input fields
};

const AddAmenitiesForm = () => {
  const [amenities, setAmenities] = useState([]); // List of amenities
  const [newAmenity, setNewAmenity] = useState({ name: '', description: '', icon: '' });
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all Material Icons and memoize them
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

  // Debounced search function for icons
  const handleSearch = debounce((query) => {
    setIconSearchQuery(query);
  }, 300);

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    return muiIcons.filter((icon) =>
      icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase())
    );
  }, [iconSearchQuery, muiIcons]);

  // Add a new amenity to the list
  const handleAddAmenity = () => {
    if (newAmenity.name.trim() && newAmenity.description.trim() && newAmenity.icon) {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity({ name: '', description: '', icon: '' });
      setIconSearchQuery('');
    } else {
      alert('Please fill in all fields for the new amenity');
    }
  };

  // Delete an amenity from the list
  const handleDeleteAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  // Submit the entire list of amenities
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

  // Clear the selected icon
  const clearIcon = () => {
    setNewAmenity({ ...newAmenity, icon: '' });
  };

  // Render individual icon items in the FixedSizeList
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
          color: newAmenity.icon === icon.name ? colors.textLight : colors.primary,
          backgroundColor: newAmenity.icon === icon.name ? colors.primary : 'transparent',
          '&:hover': {
            backgroundColor: colors.secondary,
            color: colors.textLight,
          },
        }}
      >
        <IconComponent />
      </Button>
    );
  };

  // Get the selected icon component
  const SelectedIconComponent = newAmenity.icon ? MuiIcons[newAmenity.icon] : null;

  // Custom styles for input fields
  const inputStyles = {
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.inputBorder,
      },
      '&:hover fieldset': {
        borderColor: colors.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      },
    },
    '& .MuiInputLabel-root': {
      color: colors.inputText,
    },
    '& .MuiInputBase-input': {
      color: colors.inputText,
    },
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: colors.background, minHeight: '100vh', color: colors.textLight }}>
      <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 'bold', marginBottom: 3 }}>
        {isEditing ? 'Update Amenities' : 'Add New Amenities'}
      </Typography>

      {/* Form to add a new amenity */}
      <Paper sx={{ padding: 3, marginBottom: 4, backgroundColor: colors.secondary }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amenity Name"
              variant="outlined"
              value={newAmenity.name}
              onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
              sx={inputStyles}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amenity Description"
              variant="outlined"
              value={newAmenity.description}
              onChange={(e) => setNewAmenity({ ...newAmenity, description: e.target.value })}
              sx={inputStyles}
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
              sx={inputStyles}
            />
            <Box
              sx={{
                marginTop: 2,
                height: 200,
                border: `1px solid ${colors.primary}`,
                borderRadius: 1,
                padding: 2,
                backgroundColor: colors.background,
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
                backgroundColor: colors.primary,
                color: colors.textLight,
                '&:hover': { backgroundColor: colors.secondary },
              }}
            >
              Add to List
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display current list of amenities */}
      <Paper sx={{ padding: 3, marginBottom: 4, backgroundColor: colors.secondary }}>
        <Typography variant="h6" sx={{ color: colors.primary, marginBottom: 2 }}>
          Current Amenities
        </Typography>
        {amenities.length === 0 ? (
          <Typography sx={{ color: colors.textLight }}>No amenities added yet.</Typography>
        ) : (
          <List>
            {amenities.map((amenity, index) => (
              <ListItem key={index} sx={{ borderBottom: `1px solid ${colors.primary}` }}>
                <Avatar sx={{ backgroundColor: colors.primary, marginRight: 2 }}>
                  {amenity.icon ? React.createElement(MuiIcons[amenity.icon]) : null}
                </Avatar>
                <ListItemText
                  primary={amenity.name}
                  secondary={amenity.description}
                  primaryTypographyProps={{ color: colors.textLight }}
                  secondaryTypographyProps={{ color: colors.textLight }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteAmenity(index)}
                    sx={{ color: colors.error }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Submit the entire list */}
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            color: colors.textLight,
            '&:hover': { backgroundColor: colors.secondary },
          }}
        >
          {isEditing ? 'Update Amenities' : 'Save Amenities'}
        </Button>
      </form>
    </Box>
  );
};

export default AddAmenitiesForm;