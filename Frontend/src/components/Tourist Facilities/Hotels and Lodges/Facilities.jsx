import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CoffeeIcon from '@mui/icons-material/Coffee';
import TvIcon from '@mui/icons-material/Tv';
import DeskIcon from '@mui/icons-material/Desk';
import SecurityIcon from '@mui/icons-material/Security';
import IronIcon from '@mui/icons-material/Iron';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrintIcon from '@mui/icons-material/Print';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LockIcon from '@mui/icons-material/Lock';
import ElevatorIcon from '@mui/icons-material/Elevator';
import ShowerIcon from '@mui/icons-material/Shower';
import HotelIcon from '@mui/icons-material/Hotel';
import WcIcon from '@mui/icons-material/Wc';
import BrushIcon from '@mui/icons-material/Brush';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LandscapeIcon from '@mui/icons-material/Landscape';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AcUnit from '@mui/icons-material/AcUnit';
import LocalBar from '@mui/icons-material/LocalBar';

const Facilities = () => {
  const facilities = [
    {
      title: "Free WiFi",
      description: "Stay connected with high-speed internet access throughout the hotel.",
      icon: <WifiIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Airport Shuttle",
      description: "Enjoy complimentary shuttle service to and from the airport.",
      icon: <AirportShuttleIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Non-Smoking Rooms",
      description: "All rooms are smoke-free for a fresh and comfortable stay.",
      icon: <SmokeFreeIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Free Parking",
      description: "Park your vehicle securely with our complimentary parking.",
      icon: <LocalParkingIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Room Service",
      description: "Enjoy delicious meals delivered straight to your room, 24/7.",
      icon: <RoomServiceIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Restaurant",
      description: "Savor exquisite dishes at our in-house restaurant.",
      icon: <RestaurantIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "24-Hour Desk",
      description: "Our friendly staff is available around the clock to assist you.",
      icon: <MeetingRoomIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Tea/Coffee Maker",
      description: "Enjoy a hot cup of tea or coffee in the comfort of your room.",
      icon: <CoffeeIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Private Bathroom",
      description: "All rooms feature a private bathroom with modern amenities.",
      icon: <ShowerIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Air Conditioning",
      description: "Stay cool and comfortable with individually controlled AC.",
      icon: <AcUnit sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Flat-Screen TV",
      description: "Relax and unwind with a wide selection of channels.",
      icon: <TvIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Housekeeping",
      description: "Experience a clean and tidy room with daily housekeeping.",
      icon: <CleaningServicesIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Business Center",
      description: "Stay productive with access to our fully equipped business center.",
      icon: <BusinessCenterIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Laundry",
      description: "Keep your clothes fresh and clean with our laundry service.",
      icon: <LocalLaundryServiceIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "24-Hour Security",
      description: "Your safety is our priority with round-the-clock security.",
      icon: <SecurityIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Elevator",
      description: "Easily access all floors with our modern elevator system.",
      icon: <ElevatorIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "Ironing",
      description: "Keep your clothes wrinkle-free with in-room ironing facilities.",
      icon: <IronIcon sx={{ color: '#00ADB5' }} />,
    },
    {
      title: "City View",
      description: "Wake up to stunning views of the city skyline from select rooms.",
      icon: <LandscapeIcon sx={{ color: '#00ADB5' }} />,
    },
  ];

  return (
    <Box sx={{ p: 2, backgroundColor: '#222831', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold', textAlign: 'left', mb: 2 }}>
        Hotel Facilities
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: '#EEEEEE', textAlign: 'left', mb: 3 }}>
        Enjoy a wide range of amenities designed to make your stay comfortable and convenient.
      </Typography>

      <Grid container spacing={2} justifyContent="flex-start">
        {facilities.map((facility, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                width: '100%',
                p: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#393E46',
                  borderRadius: 1,
                },
              }}
            >
              <Avatar sx={{ backgroundColor: '#222831', width: 40, height: 40, mr: 2 }}>
                {facility.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
                  {facility.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#EEEEEE' }}>
                  {facility.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Facilities;