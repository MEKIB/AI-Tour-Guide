import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Typography, Grid, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import HeroImage from "../../assets/hospital.png"; // Placeholder for hero image

// Placeholder image (replace with actual image path or URL)

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Typography color="error">
          Map failed to load. Please try again.
        </Typography>
      );
    }
    return this.props.children;
  }
}

// Styles matching BirdWatchingPage.jsx
const containerStyle = { width: "100%", padding: "20px" };
const breadcrumbStyle = { marginBottom: "20px" };
const breadcrumbLinkStyle = {
  color: "#00ADB5",
  textDecoration: "none",
  fontSize: "1rem",
};
const breadcrumbTextStyle = { color: "#EEEEEE", fontSize: "1rem" };
const heroStyle = {
  position: "relative",
  width: "100%",
  height: "500px",
  overflow: "hidden",
  borderRadius: "16px",
  marginBottom: "20px",
};
const heroImageStyle = { width: "100%", height: "100%", objectFit: "cover" };
const heroTitleStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#00ADB5",
  fontSize: "2.5rem",
  fontWeight: 600,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  textAlign: "center",
};
const contentStyle = {
  background: "rgba(57, 62, 70, 0.8)",
  padding: "20px",
  borderRadius: "16px",
  color: "#EEEEEE",
};
const textStyle = { fontSize: "1rem", lineHeight: "1.6", marginBottom: "15px" };
const buttonStyle = {
  padding: "10px 20px",
  background: "#00ADB5",
  color: "#EEEEEE",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  "&:hover": { background: "#008c93" },
  "&:disabled": { background: "#ccc", cursor: "not-allowed" },
};
const cardStyle = {
  padding: "15px",
  background: "rgba(57, 62, 70, 0.9)",
  borderRadius: "8px",
  color: "#EEEEEE",
};

const ServiceProviderSearch = () => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);
  const [nearestPoliceStation, setNearestPoliceStation] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Bahir Dar coordinates
  const DEFAULT_LOCATION = {
    latitude: 11.5936,
    longitude: 37.3903,
    city: "Bahir Dar",
  };

  // City coordinate ranges
  const CITY_RANGES = [
    {
      city: "Bahir Dar",
      latMin: 11.5,
      latMax: 11.7,
      lngMin: 37.3,
      lngMax: 37.5,
    },
    {
      city: "Lalibela",
      latMin: 11.9,
      latMax: 12.1,
      lngMin: 39.0,
      lngMax: 39.1,
    },
    {
      city: "Gonder",
      latMin: 12.5,
      latMax: 12.7,
      lngMin: 37.4,
      lngMax: 37.5,
    },
  ];

  // Determine city based on coordinates
  const getCityFromCoordinates = (latitude, longitude) => {
    for (const range of CITY_RANGES) {
      if (
        latitude >= range.latMin &&
        latitude <= range.latMax &&
        longitude >= range.lngMin &&
        longitude <= range.lngMax
      ) {
        return range.city;
      }
    }
    return DEFAULT_LOCATION.city;
  };

  // Haversine formula for distance (km)
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
    return R * c;
  };

  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    setProviders([]);
    setNearestHospital(null);
    setNearestPoliceStation(null);

    if (navigator.geolocation) {
      console.log("Geolocation API called");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location:", { latitude, longitude });
          const city = getCityFromCoordinates(latitude, longitude);
          setUserLocation({ latitude, longitude });
          setUserCity(city);
          fetchProviders(latitude, longitude, city);
        },
        (geoError) => {
          console.error("Geolocation error:", geoError.message);
          setError("Unable to get location. Using Bahir Dar as default.");
          setUserLocation(DEFAULT_LOCATION);
          setUserCity(DEFAULT_LOCATION.city);
          fetchProviders(
            DEFAULT_LOCATION.latitude,
            DEFAULT_LOCATION.longitude,
            DEFAULT_LOCATION.city
          );
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation not supported. Using Bahir Dar as default.");
      setUserLocation(DEFAULT_LOCATION);
      setUserCity(DEFAULT_LOCATION.city);
      fetchProviders(
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
        DEFAULT_LOCATION.city
      );
    }
  };

  const fetchProviders = async (latitude, longitude, city) => {
    try {
      console.log("Fetching providers for:", { latitude, longitude, city });
      const response = await axios.get(
        `http://localhost:2000/api/service-providers/nearby`,
        {
          params: { longitude, latitude, city },
        }
      );
      const fetchedProviders = response.data.data || [];
      const providersWithDistance = fetchedProviders.map((provider) => ({
        ...provider,
        distance: calculateDistance(
          latitude,
          longitude,
          provider.location.coordinates[1],
          provider.location.coordinates[0]
        ),
      }));
      providersWithDistance.sort((a, b) => a.distance - b.distance);
      console.log("Providers fetched:", providersWithDistance);
      setProviders(providersWithDistance);

      const hospital = providersWithDistance.find(
        (p) => p.typeId === "hospital"
      );
      const policeStation = providersWithDistance.find(
        (p) => p.typeId === "police_station"
      );
      setNearestHospital(hospital || null);
      setNearestPoliceStation(policeStation || null);

      setError(
        providersWithDistance.length === 0
          ? "No providers found in this area."
          : null
      );
      setLoading(false);
    } catch (err) {
      console.error("API error:", err);
      setError(
        "Failed to fetch providers: " +
          (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (
      !userLocation ||
      (!nearestHospital && !nearestPoliceStation) ||
      !mapRef.current
    )
      return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [userLocation.latitude, userLocation.longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    L.marker([userLocation.latitude, userLocation.longitude])
      .addTo(mapInstanceRef.current)
      .bindPopup("Your Location")
      .openPopup();

    if (nearestHospital) {
      L.marker([
        nearestHospital.location.coordinates[1],
        nearestHospital.location.coordinates[0],
      ])
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `${
            nearestHospital.name
          } (hospital)<br>Distance: ${nearestHospital.distance.toFixed(2)} km`
        );

      L.polyline(
        [
          [userLocation.latitude, userLocation.longitude],
          [
            nearestHospital.location.coordinates[1],
            nearestHospital.location.coordinates[0],
          ],
        ],
        { color: "blue" }
      ).addTo(mapInstanceRef.current);
    }

    if (nearestPoliceStation) {
      L.marker([
        nearestPoliceStation.location.coordinates[1],
        nearestPoliceStation.location.coordinates[0],
      ])
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `${
            nearestPoliceStation.name
          } (police_station)<br>Distance: ${nearestPoliceStation.distance.toFixed(
            2
          )} km`
        );

      L.polyline(
        [
          [userLocation.latitude, userLocation.longitude],
          [
            nearestPoliceStation.location.coordinates[1],
            nearestPoliceStation.location.coordinates[0],
          ],
        ],
        { color: "red" }
      ).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, nearestHospital, nearestPoliceStation]);

  return (
    <Box
      sx={{
        background: "rgba(34, 40, 49, 0.8)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div style={containerStyle}>
        {/* Breadcrumbs */}
        <div style={breadcrumbStyle}>
          <MuiLink component={Link} to="/" sx={breadcrumbLinkStyle}>
            Home
          </MuiLink>
          <Typography component="span" sx={breadcrumbTextStyle}>
            {" / "}
          </Typography>
        </div>

        {/* Hero Section */}
        <div style={heroStyle}>
          <img src={HeroImage} alt="Service Providers" style={heroImageStyle} />
          <Typography component="h1" style={heroTitleStyle}>
            Service Providers in {userCity || "Your City"}
          </Typography>
        </div>

        {/* Content Section */}
        <div style={contentStyle}>
          <Box sx={{ marginBottom: "20px" }}>
            <button
              onClick={getUserLocation}
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Loading..." : "Find Nearby Providers"}
            </button>
            {error && (
              <Typography color="error" sx={textStyle}>
                {error}
              </Typography>
            )}
          </Box>

          {/* Leaflet Map */}
          <ErrorBoundary>
            {(nearestHospital || nearestPoliceStation) && (
              <div
                ref={mapRef}
                style={{
                  height: "300px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              ></div>
            )}
          </ErrorBoundary>

          {/* Nearest Hospital and Police Station */}
          {(nearestHospital || nearestPoliceStation) && (
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              {nearestHospital && (
                <Grid item xs={12} md={6}>
                  <Box sx={cardStyle}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#00ADB5", marginBottom: "10px" }}
                    >
                      Nearest Hospital
                    </Typography>
                    <Typography sx={textStyle}>
                      <strong>{nearestHospital.name}</strong> (hospital)
                    </Typography>
                    <Typography sx={textStyle}>
                      City: {nearestHospital.city}
                    </Typography>
                    <Typography sx={textStyle}>
                      Address: {nearestHospital.address}
                    </Typography>
                    <Typography sx={textStyle}>
                      Phone: {nearestHospital.phoneNumber}
                    </Typography>
                    <Typography sx={textStyle}>
                      Distance: {nearestHospital.distance.toFixed(2)} km
                    </Typography>
                    <Typography sx={textStyle}>
                      Location: Lat {nearestHospital.location.coordinates[1]},
                      Lng {nearestHospital.location.coordinates[0]}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {nearestPoliceStation && (
                <Grid item xs={12} md={6}>
                  <Box sx={cardStyle}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#00ADB5", marginBottom: "10px" }}
                    >
                      Nearest Police Station
                    </Typography>
                    <Typography sx={textStyle}>
                      <strong>{nearestPoliceStation.name}</strong>{" "}
                      (police_station)
                    </Typography>
                    <Typography sx={textStyle}>
                      City: {nearestPoliceStation.city}
                    </Typography>
                    <Typography sx={textStyle}>
                      Address: {nearestPoliceStation.address}
                    </Typography>
                    <Typography sx={textStyle}>
                      Phone: {nearestPoliceStation.phoneNumber}
                    </Typography>
                    <Typography sx={textStyle}>
                      Distance: {nearestPoliceStation.distance.toFixed(2)} km
                    </Typography>
                    <Typography sx={textStyle}>
                      Location: Lat{" "}
                      {nearestPoliceStation.location.coordinates[1]}, Lng{" "}
                      {nearestPoliceStation.location.coordinates[0]}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}

          {/* All Providers */}
          {providers.length > 0 ? (
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#00ADB5", marginBottom: "15px" }}
              >
                All Service Providers in {userCity} (Sorted by Distance)
              </Typography>
              <Grid container spacing={2}>
                {/* Hospitals Column */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00ADB5", marginBottom: "10px" }}
                  >
                    Hospitals
                  </Typography>
                  {providers
                    .filter((provider) => provider.typeId === "hospital")
                    .map((provider) => (
                      <Box
                        key={provider._id}
                        sx={{
                          ...cardStyle,
                          marginBottom: "10px",
                          background:
                            provider === nearestHospital
                              ? "rgba(0, 173, 181, 0.1)"
                              : "rgba(57, 62, 70, 0.9)",
                        }}
                      >
                        <Typography sx={textStyle}>
                          <strong>{provider.name}</strong> (hospital)
                        </Typography>
                        <Typography sx={textStyle}>
                          City: {provider.city}
                        </Typography>
                        <Typography sx={textStyle}>
                          Address: {provider.address}
                        </Typography>
                        <Typography sx={textStyle}>
                          Phone: {provider.phoneNumber}
                        </Typography>
                        <Typography sx={textStyle}>
                          Distance: {provider.distance.toFixed(2)} km
                        </Typography>
                        <Typography sx={textStyle}>
                          Location: Lat {provider.location.coordinates[1]}, Lng{" "}
                          {provider.location.coordinates[0]}
                        </Typography>
                      </Box>
                    ))}
                </Grid>
                {/* Police Stations Column */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00ADB5", marginBottom: "10px" }}
                  >
                    Police Stations
                  </Typography>
                  {providers
                    .filter((provider) => provider.typeId === "police_station")
                    .map((provider) => (
                      <Box
                        key={provider._id}
                        sx={{
                          ...cardStyle,
                          marginBottom: "10px",
                          background:
                            provider === nearestPoliceStation
                              ? "rgba(0, 173, 181, 0.1)"
                              : "rgba(57, 62, 70, 0.9)",
                        }}
                      >
                        <Typography sx={textStyle}>
                          <strong>{provider.name}</strong> (police_station)
                        </Typography>
                        <Typography sx={textStyle}>
                          City: {provider.city}
                        </Typography>
                        <Typography sx={textStyle}>
                          Address: {provider.address}
                        </Typography>
                        <Typography sx={textStyle}>
                          Phone: {provider.phoneNumber}
                        </Typography>
                        <Typography sx={textStyle}>
                          Distance: {provider.distance.toFixed(2)} km
                        </Typography>
                        <Typography sx={textStyle}>
                          Location: Lat {provider.location.coordinates[1]}, Lng{" "}
                          {provider.location.coordinates[0]}
                        </Typography>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            </Box>
          ) : (
            !loading &&
            !error && (
              <Typography sx={textStyle}>
                No providers found in {userCity}.
              </Typography>
            )
          )}
        </div>
      </div>
    </Box>
  );
};

export default ServiceProviderSearch;
