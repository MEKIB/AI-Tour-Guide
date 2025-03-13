import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material'; // Import all MUI icons
import { FixedSizeList } from 'react-window'; // For virtualized list
import { debounce } from 'lodash'; // For debouncing search input

const AddAmenitiesForm = () => {
  // State to manage form inputs
  const [amenityName, setAmenityName] = useState('');
  const [amenityDescription, setAmenityDescription] = useState('');
  const [amenityIcon, setAmenityIcon] = useState('');

  // State to store the list of amenities
  const [amenitiesList, setAmenitiesList] = useState([]);

  // State for icon search
  const [iconSearchQuery, setIconSearchQuery] = useState('');

  // Get all MUI icons dynamically
  const muiIcons = useMemo(() => {
    return Object.keys(MuiIcons).map((iconName) => ({
      name: iconName,
      component: MuiIcons[iconName],
    }));
  }, []);

  // Debounced search handler
  const handleSearch = debounce((query) => {
    setIconSearchQuery(query);
  }, 300);

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    return muiIcons.filter((icon) =>
      icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase())
    );
  }, [iconSearchQuery, muiIcons]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new amenity object
    const newAmenity = {
      name: amenityName,
      description: amenityDescription,
      icon: amenityIcon,
    };
    // Add the new amenity to the list
    setAmenitiesList([...amenitiesList, newAmenity]);
    // Reset the form
    setAmenityName('');
    setAmenityDescription('');
    setAmenityIcon('');
    setIconSearchQuery('');
  };

  // Clear selected icon
  const clearIcon = () => {
    setAmenityIcon('');
  };

  // Render individual icon item for the virtualized list
  const IconItem = ({ index, style }) => {
    const icon = filteredIcons[index];
    const IconComponent = icon.component;
    return (
      <Button
        style={style}
        variant={amenityIcon === icon.name ? 'contained' : 'outlined'}
        onClick={() => setAmenityIcon(icon.name)}
        sx={{
          minWidth: 'auto',
          padding: 1,
          borderRadius: 1,
          color: amenityIcon === icon.name ? '#EEEEEE' : '#00ADB5',
          backgroundColor: amenityIcon === icon.name ? '#00ADB5' : 'transparent',
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

  // Get the selected icon component
  const SelectedIconComponent = amenityIcon ? MuiIcons[amenityIcon] : null;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
        Add New Amenity
      </Typography>

      {/* Form to add amenities */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Amenity Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Amenity Name"
              variant="outlined"
              value={amenityName}
              onChange={(e) => setAmenityName(e.target.value)}
              required
            />
          </Grid>

          {/* Amenity Description */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Amenity Description"
              variant="outlined"
              value={amenityDescription}
              onChange={(e) => setAmenityDescription(e.target.value)}
              required
            />
          </Grid>

          {/* Icon Search and Selection */}
          <Grid item xs={12}>
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

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#00ADB5',
                '&:hover': { backgroundColor: '#008B8B' },
              }}
            >
              Add Amenity
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display the list of added amenities */}
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h5" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 2 }}>
          Added Amenities
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
    </Box>
  );
};

export default AddAmenitiesForm;