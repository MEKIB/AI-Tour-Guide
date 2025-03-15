import React, { useEffect, useRef, useState } from 'react';
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
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import Routing Machine CSS

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});
L.Marker.prototype.options.icon = DefaultIcon;

const HotelDetail = () => {
  // Sample hotel data
  const hotelData = {
    name: 'Unison Hotel and spa ',
    location: 'Bahir dar',
    facilityType: 'HOTEL',
    description:
      'Experience unparalleled luxury at our beachfront resort. Enjoy world-class amenities, fine dining, and breathtaking ocean views.',
    about:
      'Nestled along the pristine shores of Miami Beach, our resort offers a perfect blend of relaxation and adventure. With luxurious accommodations, state-of-the-art facilities, and exceptional service, we ensure an unforgettable stay for our guests.',
    lat: '11.59587452256446',
    long: '37.385772807400166',
    images: [
      {
        url: '/images/resort-exterior.jpg', // Path to local image
        name: 'Resort Exterior',
      },
      {
        url: '/images/lobby.jpg', // Path to local image
        name: 'Lobby',
      },
      {
        url: '/images/pool-area.jpg', // Path to local image
        name: 'Pool Area',
      },
    ],
  };

  // Destructure hotel data
  const {
    name,
    location,
    facilityType,
    description,
    about,
    lat,
    long,
    images,
  } = hotelData;

  // Convert latitude and longitude to numbers
  const latitude = parseFloat(lat);
  const longitude = parseFloat(long);

  // Specific locations for hospitals, police stations, and banks
  const specificLocations = [
    // Banks
    {
      lat: '11.594690078228082',
      lon: '37.38865273842119',
      display_name: 'Bank 1',
      type: 'bank',
    },
    {
      lat: '11.594710831398931',
      lon: '37.38776365645047',
      display_name: 'Bank 2',
      type: 'bank',
    },
    // Hospitals
    {
      lat: '11.584627059258128',
      lon: '37.38716215312828',
      display_name: 'Hospital 1',
      type: 'hospital',
    },
    {
      lat: '11.59293635701899',
      lon: '37.391580324394546',
      display_name: 'Hospital 2',
      type: 'hospital',
    },
    // Police Stations
    {
      lat: '11.596127189223228',
      lon: '37.381991769722404',
      display_name: 'Police Station 1',
      type: 'police',
    },
    {
      lat: '11.58906382214536',
      lon: '37.383878891343294',
      display_name: 'Police Station 2',
      type: 'police',
    },
  ];

  // Function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2); // Round to 2 decimal places
  };

  // Function to create custom icons with text
  const createCustomIcon = (text, type) => {
    let iconColor;
    switch (type) {
      case 'hospital':
        iconColor = '#FF0000'; // Red for hospitals
        break;
      case 'police':
        iconColor = '#0000FF'; // Blue for police stations
        break;
      case 'bank':
        iconColor = '#008000'; // Green for banks
        break;
      default:
        iconColor = '#000000'; // Black as default
    }

    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${iconColor}; color: white; padding: 5px; border-radius: 50%; text-align: center; font-size: 12px;">${text}</div>`,
      iconSize: [30, 30], // Size of the icon
      iconAnchor: [15, 15], // Center the icon
    });
  };

  return (
    <Box sx={{ bgcolor: '#393E46', color: '#EEEEEE', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '400px',
          backgroundImage: 'url(/images/resort-exterior.jpg)', // Use a high-quality image
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
            background: 'linear-gradient(135deg, rgba(0, 173, 181, 0.8), rgba(34, 40, 49, 0.9))', // Gradient overlay
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background for text
            backdropFilter: 'blur(5px)', // Blur effect
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
              color: '#00ADB5', // Vibrant color for the hotel name
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              fontWeight: 'medium',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
              color: '#00ADB5', // Light color for location
            }}
          >
            Location: {location}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: 'medium',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
              color: '#00ADB5', // Vibrant color for facility type
            }}
          >
            Facility Type: {facilityType}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Paper
        sx={{
          p: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 800,
          mx: 'auto',
          mt: -10, // Overlap the hero section
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Grid container spacing={3}>
          {/* Description */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: '#222831',
                fontWeight: 'bold',
                backgroundColor: '#00ADB5',
                padding: 1,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <strong>Description:</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#222831',
                mt: 1,
                padding: 2,
                backgroundColor: '#EEEEEE',
                borderRadius: 1,
              }}
            >
              {description}
            </Typography>
          </Grid>

          {/* About Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: '#222831',
                fontWeight: 'bold',
                backgroundColor: '#00ADB5',
                padding: 1,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <strong>About:</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#222831',
                mt: 1,
                padding: 2,
                backgroundColor: '#EEEEEE',
                borderRadius: 1,
              }}
            >
              {about}
            </Typography>
          </Grid>

          {/* Images */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: '#222831',
                fontWeight: 'bold',
                backgroundColor: '#00ADB5',
                padding: 1,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <strong>Images:</strong>
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mt: 2 }}>
              {images.map((image, index) => (
                <Avatar
                  key={index}
                  src={image.url} // Uses local image path
                  alt={image.name}
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Nearby Facilities */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: '#222831',
                fontWeight: 'bold',
                backgroundColor: '#00ADB5',
                padding: 1,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
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
            <Typography
              variant="h6"
              sx={{
                color: '#222831',
                fontWeight: 'bold',
                backgroundColor: '#00ADB5',
                padding: 1,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <strong>Location on Map:</strong>
            </Typography>
            <Box sx={{ mt: 2, height: 400, width: '100%' }}>
              <MapContainer
                center={[latitude, longitude]} // Center the map on the hotel's location
                zoom={15} // Increase zoom level
                style={{ height: '100%', width: '100%' }}
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                  setIsMapInitialized(true); // Set map as initialized
                  console.log('Map container initialized:', mapInstance); // Debugging
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tiles
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Hotel Marker */}
                <Marker position={[latitude, longitude]}>
                  <Popup>
                    <strong>{name}</strong> <br /> {location}
                  </Popup>
                </Marker>

                {/* Nearby Places Markers */}
                {specificLocations.map((place, index) => (
                  <Marker
                    key={index}
                    position={[parseFloat(place.lat), parseFloat(place.lon)]}
                    icon={createCustomIcon(place.type.charAt(0).toUpperCase(), place.type)} // Use first letter of the type
                  >
                    <Popup>
                      <strong>{place.display_name}</strong> <br /> {place.type}
                      <div>
                        Distance: {calculateDistance(latitude, longitude, parseFloat(place.lat), parseFloat(place.lon))} km
                      </div>
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