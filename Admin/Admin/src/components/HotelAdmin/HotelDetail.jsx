import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios'; // Import axios for API calls
import { useParams } from 'react-router-dom'; // For getting hotel ID from URL

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const HotelDetail = () => {
  const { id } = useParams(); // Get hotel ID from URL params (requires React Router setup)
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotel data from the backend
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/hotels/${id}`);
        setHotelData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load hotel details');
        setLoading(false);
      }
    };
    fetchHotelData();
  }, [id]);

  // Specific locations for hospitals, police stations, and banks (unchanged)
  const specificLocations = [
    { lat: '11.594690078228082', lon: '37.38865273842119', display_name: 'Bank 1', type: 'bank' },
    { lat: '11.594710831398931', lon: '37.38776365645047', display_name: 'Bank 2', type: 'bank' },
    { lat: '11.584627059258128', lon: '37.38716215312828', display_name: 'Hospital 1', type: 'hospital' },
    { lat: '11.59293635701899', lon: '37.391580324394546', display_name: 'Hospital 2', type: 'hospital' },
    { lat: '11.596127189223228', lon: '37.381991769722404', display_name: 'Police Station 1', type: 'police' },
    { lat: '11.58906382214536', lon: '37.383878891343294', display_name: 'Police Station 2', type: 'police' },
  ];

  // Function to calculate distance using Haversine formula (unchanged)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  // Function to create custom icons with text (unchanged)
  const createCustomIcon = (text, type) => {
    let iconColor;
    switch (type) {
      case 'hospital': iconColor = '#FF0000'; break;
      case 'police': iconColor = '#0000FF'; break;
      case 'bank': iconColor = '#008000'; break;
      default: iconColor = '#000000';
    }
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${iconColor}; color: white; padding: 5px; border-radius: 50%; text-align: center; font-size: 12px;">${text}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!hotelData) {
    return <Typography>No hotel data available</Typography>;
  }

  const { name, location, facilityType, description, lat, long, images } = hotelData;
  const latitude = parseFloat(lat);
  const longitude = parseFloat(long);

  return (
    <Box sx={{ bgcolor: '#393E46', color: '#EEEEEE', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '400px',
          backgroundImage: `url(${images[0]?.url || '/images/resort-exterior.jpg'})`, // Use first image from backend
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0, 173, 181, 0.8), rgba(34, 40, 49, 0.9))',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            zIndex: 1,
            color: '#FFFFFF',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', color: '#00ADB5' }}>
            {name}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 'medium', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)', color: '#00ADB5' }}>
            Location: {location}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'medium', fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)', color: '#00ADB5' }}>
            Facility Type: {facilityType}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Paper sx={{ p: 3, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 3, maxWidth: 800, mx: 'auto', mt: -10, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#222831', fontWeight: 'bold', backgroundColor: '#00ADB5', padding: 1, borderRadius: 1, textAlign: 'center' }}>
              <strong>Description:</strong>
            </Typography>
            <Typography variant="body1" sx={{ color: '#222831', mt: 1, padding: 2, backgroundColor: '#EEEEEE', borderRadius: 1 }}>
              {description}
            </Typography>
          </Grid>

          {/* Images */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#222831', fontWeight: 'bold', backgroundColor: '#00ADB5', padding: 1, borderRadius: 1, textAlign: 'center' }}>
              <strong>Images:</strong>
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mt: 2 }}>
              {images.map((image, index) => (
                <Avatar key={index} src={`http://localhost:2001${image.url}`} alt={image.name} variant="rounded" sx={{ width: 100, height: 100 }} />
              ))}
            </Stack>
          </Grid>

          {/* Nearby Facilities */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#222831', fontWeight: 'bold', backgroundColor: '#00ADB5', padding: 1, borderRadius: 1, textAlign: 'center' }}>
              <strong>Nearby Facilities:</strong>
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
              <Chip label="Hospitals" color="primary" />
              <Chip label="Police Stations" color="secondary" />
              <Chip label="Banks" color="success" />
            </Stack>
          </Grid>

          {/* Map */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#222831', fontWeight: 'bold', backgroundColor: '#00ADB5', padding: 1, borderRadius: 1, textAlign: 'center' }}>
              <strong>Location on Map:</strong>
            </Typography>
            <Box sx={{ mt: 2, height: 400, width: '100%' }}>
              <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>
                    <strong>{name}</strong> <br /> {location}
                  </Popup>
                </Marker>
                {specificLocations.map((place, index) => (
                  <Marker
                    key={index}
                    position={[parseFloat(place.lat), parseFloat(place.lon)]}
                    icon={createCustomIcon(place.type.charAt(0).toUpperCase(), place.type)}
                  >
                    <Popup>
                      <strong>{place.display_name}</strong> <br /> {place.type}
                      <div>Distance: {calculateDistance(latitude, longitude, parseFloat(place.lat), parseFloat(place.lon))} km</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HotelDetail;