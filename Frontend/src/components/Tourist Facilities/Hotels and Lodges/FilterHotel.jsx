// HotelFilter.js
import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  Paper,
  styled,
} from '@mui/material';

const ALL_LOCATIONS = 'All Locations';
const ALL_FACILITY_TYPES = 'All Facility Types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 8,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const HotelFilter = ({ onApply = () => {} }) => {
  const locations = [ALL_LOCATIONS, 'Bahir Dar', 'Gondar', 'Lalibela'];
  const facilityTypes = [ALL_FACILITY_TYPES, 'Hotels', 'Lodges', 'Restaurants'];

  const [selectedLocation, setSelectedLocation] = useState(ALL_LOCATIONS);
  const [selectedFacilityType, setSelectedFacilityType] = useState(ALL_FACILITY_TYPES);

  const handleLocationChange = event => setSelectedLocation(event.target.value);
  const handleFacilityTypeChange = event => setSelectedFacilityType(event.target.value);

  const handleApplyFilters = () => onApply(selectedLocation, selectedFacilityType);

  return (
    <StyledPaper>
      <Box sx={{ minWidth: 120, maxWidth: 300 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: '500' }}>Filter Hotels</Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, color: '#555' }}>Locations</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="location-filter-label" sx={{ color: '#777' }}>Location</InputLabel>
          <Select
            labelId="location-filter-label"
            id="location-filter"
            value={selectedLocation}
            onChange={handleLocationChange}
            displayEmpty
            renderValue={selected => selected || "Select Location"}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#999' },
                '&.Mui-focused fieldset': { borderColor: '#3f51b5' },
              },
            }}
          >
            {locations.map(location => <MenuItem key={location} value={location}>{location}</MenuItem>)}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, color: '#555' }}>Facility Types</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="facility-type-filter-label" sx={{ color: '#777' }}>Facility Type</InputLabel>
          <Select
            labelId="facility-type-filter-label"
            id="facility-type-filter"
            value={selectedFacilityType}
            onChange={handleFacilityTypeChange}
            displayEmpty
            renderValue={selected => selected || "Select Facility Type"}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#999' },
                '&.Mui-focused fieldset': { borderColor: '#3f51b5' },
              },
            }}
          >
            {facilityTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleApplyFilters} sx={{ textTransform: 'none' }}>
            Apply Filter
          </Button>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default HotelFilter;