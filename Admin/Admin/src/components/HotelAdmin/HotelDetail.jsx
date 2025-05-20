import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip,
    Fade,
    Container,
    IconButton,
    Tooltip,
    Button,
    Modal,
    Avatar,
    IconButton as ModalIconButton,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import { Info, Map, Image, LocalHospital, LocalPolice, AccountBalance, Close, ArrowBack, ArrowForward } from '@mui/icons-material';

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
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('overview');
    const [visibleFacilities, setVisibleFacilities] = useState({
        bank: true,
        hospital: true,
        police: true,
    });
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Token is missing. Please log in.");
                    setLoading(false);
                    return;
                }
                const response = await axios.get('http://localhost:2000/api/hotel/admin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHotelData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('API Error:', err);
                setError('Failed to load hotel details. Please check console for errors.');
                setLoading(false);
            }
        };
        fetchHotelData();
    }, []);

    const specificLocations = [
        { lat: 11.594690078228082, lon: 37.38865273842119, display_name: 'Bank 1', type: 'bank' },
        { lat: 11.594710831398931, lon: 37.38776365645047, display_name: 'Bank 2', type: 'bank' },
        { lat: 11.584627059258128, lon: 37.38716215312828, display_name: 'Hospital 1', type: 'hospital' },
        { lat: 11.59293635701899, lon: 37.391580324394546, display_name: 'Hospital 2', type: 'hospital' },
        { lat: 11.596127189223228, lon: 37.381991769722404, display_name: 'Police Station 1', type: 'police' },
        { lat: 11.58906382214536, lon: 37.383878891343294, display_name: 'Police Station 2', type: 'police' },
    ];

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

    const createCustomIcon = (text, type) => {
        let iconColor;
        switch (type) {
            case 'hospital': iconColor = '#E91E63'; break;
            case 'police': iconColor = '#3F51B5'; break;
            case 'bank': iconColor = '#4CAF50'; break;
            default: iconColor = '#212121';
        }
        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${iconColor}; color: white; padding: 10px; border-radius: 50%; text-align: center; font-size: 16px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">${text}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });
    };

    const RoutingMachine = ({ start, end }) => {
        const map = useMap();
        const routingControlRef = useRef(null);

        useEffect(() => {
            if (!map || !start || !end) return;

            // Clear previous route
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
                routingControlRef.current = null;
            }

            try {
                routingControlRef.current = L.Routing.control({
                    waypoints: [
                        L.latLng(start[0], start[1]),
                        L.latLng(end[0], end[1]),
                    ],
                    lineOptions: {
                        styles: [{ color: '#00ADB5', weight: 5, opacity: 0.8 }],
                    },
                    createMarker: () => null,
                    addWaypoints: false,
                    routeWhileDragging: false,
                    show: true,
                    showAlternatives: false,
                    fitSelectedRoutes: true,
                }).addTo(map);
            } catch (err) {
                console.error('Routing Machine Error:', err);
            }

            return () => {
                if (routingControlRef.current) {
                    map.removeControl(routingControlRef.current);
                    routingControlRef.current = null;
                }
            };
        }, [map, start, end]);

        return null;
    };

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % hotelData.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + hotelData.images.length) % hotelData.images.length);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#222831' }}>
                <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', animation: 'fadeInOut 1.5s infinite' }}>
                    Loading...
                </Typography>
                <style>{`
                    @keyframes fadeInOut {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 1; }
                    }
                `}</style>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#222831' }}>
                <Paper sx={{ p: 4, bgcolor: '#393E46', borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#E91E63', fontWeight: 'bold', mb: 2 }}>
                        {error}
                    </Typography>
                    <Tooltip title="Retry">
                        <IconButton onClick={() => window.location.reload()} sx={{ color: '#00ADB5' }}>
                            <Info />
                        </IconButton>
                    </Tooltip>
                </Paper>
            </Box>
        );
    }

    if (!hotelData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#222831' }}>
                <Paper sx={{ p: 4, bgcolor: '#393E46', borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#EEEEEE', fontWeight: 'bold', mb: 2 }}>
                        No hotel data available
                    </Typography>
                    <Tooltip title="Retry">
                        <IconButton onClick={() => window.location.reload()} sx={{ color: '#00ADB5' }}>
                            <Info />
                        </IconButton>
                    </Tooltip>
                </Paper>
            </Box>
        );
    }

    const { name, location, facilityType, description, lat, long, images } = hotelData;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    const toggleFacility = (type) => {
        setVisibleFacilities((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleMarkerClick = (place) => {
        setSelectedRoute([latitude, longitude, place.lat, place.lon]);
    };

    const clearRoute = () => {
        setSelectedRoute(null);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#00ADB5',
                                    fontWeight: 'bold',
                                    p: 2,
                                    borderBottom: '2px solid #00ADB5',
                                    mb: 3,
                                }}
                            >
                                Overview
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#EEEEEE',
                                    p: 3,
                                    background: 'linear-gradient(145deg, #393E46, #2E333B)',
                                    borderRadius: 2,
                                    lineHeight: 1.9,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                {description}
                            </Typography>
                        </Box>
                    </Fade>
                );
            case 'gallery':
                return (
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#00ADB5',
                                    fontWeight: 'bold',
                                    p: 2,
                                    borderBottom: '2px solid #00ADB5',
                                    mb: 3,
                                }}
                            >
                                Gallery
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(auto-fill, minmax(150px, 1fr))',
                                        sm: 'repeat(auto-fill, minmax(200px, 1fr))',
                                        md: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    },
                                    gap: 2,
                                    justifyContent: 'center',
                                }}
                            >
                                {images.map((image, index) => (
                                    <Avatar
                                        key={index}
                                        src={`http://localhost:2000${image.url}`}
                                        alt={image.name}
                                        variant="rounded"
                                        onClick={() => handleImageClick(index)}
                                        sx={{
                                            width: '100%',
                                            height: { xs: 150, sm: 200, md: 250 },
                                            border: '3px solid #00ADB5',
                                            borderRadius: 2,
                                            transition: 'all 0.4s ease',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 10px 30px rgba(0, 173, 181, 0.7)',
                                                borderColor: '#0097A0',
                                                filter: 'brightness(1.1)',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Fade>
                );
            case 'facilities':
                return (
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#00ADB5',
                                    fontWeight: 'bold',
                                    p: 2,
                                    borderBottom: '2px solid #00ADB5',
                                    mb: 3,
                                }}
                            >
                                Nearby Facilities
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={3}
                                sx={{
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                }}
                            >
                                <Chip
                                    icon={<LocalHospital sx={{ color: '#FFFFFF !important' }} />}
                                    label="Hospitals"
                                    sx={{
                                        bgcolor: '#E91E63',
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        p: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: '#D81B60',
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 6px 15px rgba(233, 30, 99, 0.5)',
                                        },
                                    }}
                                />
                                <Chip
                                    icon={<LocalPolice sx={{ color: '#FFFFFF !important' }} />}
                                    label="Police Stations"
                                    sx={{
                                        bgcolor: '#3F51B5',
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        p: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: '#303F9F',
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 6px 15px rgba(63, 81, 181, 0.5)',
                                        },
                                    }}
                                />
                                <Chip
                                    icon={<AccountBalance sx={{ color: '#FFFFFF !important' }} />}
                                    label="Banks"
                                    sx={{
                                        bgcolor: '#4CAF50',
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        p: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: '#43A047',
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 6px 15px rgba(76, 175, 80, 0.5)',
                                        },
                                    }}
                                />
                            </Stack>
                        </Box>
                    </Fade>
                );
            case 'map':
                return (
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#00ADB5',
                                    fontWeight: 'bold',
                                    p: 2,
                                    borderBottom: '2px solid #00ADB5',
                                    mb: 3,
                                }}
                            >
                                Location Map
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    justifyContent: 'center',
                                    mb: 3,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Button
                                    variant={visibleFacilities.bank ? 'contained' : 'outlined'}
                                    startIcon={<AccountBalance />}
                                    onClick={() => toggleFacility('bank')}
                                    sx={{
                                        bgcolor: visibleFacilities.bank ? '#4CAF50' : 'transparent',
                                        color: visibleFacilities.bank ? '#FFFFFF' : '#4CAF50',
                                        borderColor: '#4CAF50',
                                        fontWeight: 'bold',
                                        px: 3,
                                        py: 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: visibleFacilities.bank ? '#43A047' : 'rgba(76, 175, 80, 0.1)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Banks
                                </Button>
                                <Button
                                    variant={visibleFacilities.hospital ? 'contained' : 'outlined'}
                                    startIcon={<LocalHospital />}
                                    onClick={() => toggleFacility('hospital')}
                                    sx={{
                                        bgcolor: visibleFacilities.hospital ? '#E91E63' : 'transparent',
                                        color: visibleFacilities.hospital ? '#FFFFFF' : '#E91E63',
                                        borderColor: '#E91E63',
                                        fontWeight: 'bold',
                                        px: 3,
                                        py: 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: visibleFacilities.hospital ? '#D81B60' : 'rgba(233, 30, 99, 0.1)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Hospitals
                                </Button>
                                <Button
                                    variant={visibleFacilities.police ? 'contained' : 'outlined'}
                                    startIcon={<LocalPolice />}
                                    onClick={() => toggleFacility('police')}
                                    sx={{
                                        bgcolor: visibleFacilities.police ? '#3F51B5' : 'transparent',
                                        color: visibleFacilities.police ? '#FFFFFF' : '#3F51B5',
                                        borderColor: '#3F51B5',
                                        fontWeight: 'bold',
                                        px: 3,
                                        py: 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: visibleFacilities.police ? '#303F9F' : 'rgba(63, 81, 181, 0.1)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Police Stations
                                </Button>
                                {selectedRoute && (
                                    <Button
                                        variant="outlined"
                                        onClick={clearRoute}
                                        sx={{
                                            borderColor: '#00ADB5',
                                            color: '#00ADB5',
                                            fontWeight: 'bold',
                                            px: 3,
                                            py: 1,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 173, 181, 0.1)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Clear Route
                                    </Button>
                                )}
                            </Stack>
                            <Box
                                sx={{
                                    height: { xs: 400, md: 600 },
                                    width: '100%',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                                    border: '3px solid #00ADB5',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 12px 40px rgba(0, 173, 181, 0.6)',
                                    },
                                }}
                            >
                                <MapContainer
                                    center={[latitude, longitude]}
                                    zoom={15}
                                    style={{ height: '100%', width: '100%' }}
                                >
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
                                        visibleFacilities[place.type] && (
                                            <Marker
                                                key={index}
                                                position={[place.lat, place.lon]}
                                                icon={createCustomIcon(place.type.charAt(0).toUpperCase(), place.type)}
                                                eventHandlers={{
                                                    click: () => handleMarkerClick(place),
                                                }}
                                            >
                                                <Popup>
                                                    <strong>{place.display_name}</strong> <br /> {place.type}
                                                    <div>Distance: {calculateDistance(latitude, longitude, place.lat, place.lon)} km</div>
                                                </Popup>
                                            </Marker>
                                        )
                                    ))}
                                    {selectedRoute && (
                                        <RoutingMachine
                                            start={[selectedRoute[0], selectedRoute[1]]}
                                            end={[selectedRoute[2], selectedRoute[3]]}
                                        />
                                    )}
                                </MapContainer>
                            </Box>
                        </Box>
                    </Fade>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ bgcolor: '#222831', color: '#EEEEEE', minHeight: '100vh', py: 4 }}>
            <Fade in={true} timeout={1200}>
                <Box
                    sx={{
                        height: { xs: '400px', md: '600px' },
                        backgroundImage: `url(${images[0]?.url || '/images/resort-exterior.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        borderRadius: { xs: 0, md: 4 },
                        mx: { xs: 0, md: 4 },
                        overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(145deg, rgba(0, 173, 181, 0.5), rgba(34, 40, 49, 0.7))',
                        },
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            zIndex: 1,
                            color: '#FFFFFF',
                            p: { xs: 3, md: 5 },
                            borderRadius: 3,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(15px)',
                            maxWidth: '85%',
                            animation: 'floatIn 1s ease-out',
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '2.2rem', sm: '3.5rem', md: '4.5rem' },
                                textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9)',
                                color: '#00ADB5',
                                mb: 2,
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'medium',
                                fontSize: { xs: '1.1rem', sm: '1.6rem', md: '1.9rem' },
                                textShadow: '1px 1px 6px rgba(0, 0, 0, 0.8)',
                                color: '#EEEEEE',
                            }}
                        >
                            {location} | {facilityType}
                        </Typography>
                    </Box>
                </Box>
            </Fade>

            <Container maxWidth="xl" sx={{ mt: -8 }}>
                <Paper
                    sx={{
                        bgcolor: 'rgba(57, 62, 70, 0.95)',
                        borderRadius: 4,
                        boxShadow: '0 12px 50px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 173, 181, 0.4)',
                        p: { xs: 3, md: 5 },
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: 'center',
                            mb: 4,
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { id: 'overview', label: 'Overview', icon: <Info /> },
                            { id: 'gallery', label: 'Gallery', icon: <Image /> },
                            { id: 'facilities', label: 'Facilities', icon: <LocalHospital /> },
                            { id: 'map', label: 'Map', icon: <Map /> },
                        ].map((tab) => (
                            <Tooltip key={tab.id} title={tab.label}>
                                <IconButton
                                    onClick={() => setActiveSection(tab.id)}
                                    sx={{
                                        bgcolor: activeSection === tab.id ? '#00ADB5' : '#393E46',
                                        color: activeSection === tab.id ? '#222831' : '#EEEEEE',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: '#0097A0',
                                            transform: 'scale(1.1)',
                                        },
                                        borderRadius: 2,
                                        p: 1.5,
                                    }}
                                >
                                    {tab.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Stack>
                    {renderSection()}
                </Paper>
            </Container>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Fade in={openModal}>
                    <Box
                        sx={{
                            position: 'relative',
                            maxWidth: '90%',
                            maxHeight: '80vh',
                            bgcolor: 'rgba(34, 40, 49, 0.95)',
                            borderRadius: 3,
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                            border: '2px solid #00ADB5',
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ModalIconButton
                            onClick={handleCloseModal}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                color: '#EEEEEE',
                                bgcolor: '#393E46',
                                '&:hover': { bgcolor: '#00ADB5', color: '#222831' },
                            }}
                        >
                            <Close />
                        </ModalIconButton>
                        <ModalIconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: 'absolute',
                                left: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#EEEEEE',
                                bgcolor: '#393E46',
                                '&:hover': { bgcolor: '#00ADB5', color: '#222831' },
                            }}
                        >
                            <ArrowBack />
                        </ModalIconButton>
                        <ModalIconButton
                            onClick={handleNextImage}
                            sx={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#EEEEEE',
                                bgcolor: '#393E46',
                                '&:hover': { bgcolor: '#00ADB5', color: '#222831' },
                            }}
                        >
                            <ArrowForward />
                        </ModalIconButton>
                        <img
                            src={`http://localhost:2001${images[currentImageIndex]?.url}`}
                            alt={images[currentImageIndex]?.name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                borderRadius: 8,
                                objectFit: 'contain',
                                boxShadow: '0 8px 20px rgba(0, 173, 181, 0.5)',
                            }}
                        />
                    </Box>
                </Fade>
            </Modal>

            <style>{`
                @keyframes floatIn {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </Box>
    );
};

export default HotelDetail;