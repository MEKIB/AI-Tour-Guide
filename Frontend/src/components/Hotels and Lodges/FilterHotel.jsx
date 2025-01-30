import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button
} from '@mui/material';

const LocationFilter = ({ onApply }) => {
  const allLocations = 'All Locations';
  const allFacilityTypes = 'All Facility Types';
  const locations = [allLocations, 'Bahir Dar', 'Gonder', 'Lalibela'];
  const facilityTypes = [allFacilityTypes, 'Hotels', 'Lodges', 'Restaurants'];

  const [selectedLocation, setSelectedLocation] = useState(allLocations);
  const [selectedFacilityType, setSelectedFacilityType] = useState(allFacilityTypes);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleFacilityTypeChange = (event) => {
    setSelectedFacilityType(event.target.value);
  };

  const handleApplyFilters = () => {
    onApply(selectedLocation, selectedFacilityType);
  };


  return (
    <Box sx={{ minWidth: 120, maxWidth: 300, p: 3 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
        Locations
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="location-filter-label" sx={{ display: 'none' }}>Location</InputLabel>
        <Select
          labelId="location-filter-label"
          id="location-filter"
          value={selectedLocation}
          onChange={handleLocationChange}
          displayEmpty
        >
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
        Facility Types
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="facility-type-filter-label" sx={{ display: 'none' }}>Facility Type</InputLabel>
        <Select
          labelId="facility-type-filter-label"
          id="facility-type-filter"
          value={selectedFacilityType}
          onChange={handleFacilityTypeChange}
          displayEmpty
        >
          {facilityTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Apply Filter
        </Button>
      </Box>
    </Box>
  );
};

export default LocationFilter;