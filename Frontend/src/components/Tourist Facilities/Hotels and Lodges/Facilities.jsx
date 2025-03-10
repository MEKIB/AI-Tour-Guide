// Facilities.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
import LanguageIcon from '@mui/icons-material/Language';
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

const Facilities = ({ facilities = [] }) => {

    const facilityIcons = {
        "Airport shuttle (free)": <AirportShuttleIcon />,
        "Non-smoking rooms": <SmokeFreeIcon />,
        "Free parking": <LocalParkingIcon />,
        "Room service": <RoomServiceIcon />,
        "Free WiFi": <WifiIcon />,
        "Restaurant": <RestaurantIcon />,
        "24-hour front desk": <MeetingRoomIcon />,
        "Tea/coffee maker in all rooms": <CoffeeIcon />,
        "Breakfast": <CoffeeIcon />,
        "Parking": <LocalParkingIcon />,
        "Private bathroom": <ShowerIcon />,
        "Air conditioning": <AcUnit />,
        "Minibar": <LocalBar />,
        "Toilet paper": <WcIcon />,
        "Towels": <HotelIcon />,
        "Bath or shower": <ShowerIcon />,
        "Toilet": <WcIcon />,
        "Free toiletries": <BrushIcon />,
        "Hairdryer": <BrushIcon />,
        "Alarm clock": <WatchLaterIcon />,
        "City view": <LandscapeIcon />,
        "Entertainment staff": <EmojiPeopleIcon />,
        "Desk": <DeskIcon />,
        "TV": <TvIcon />,
        "Daily housekeeping": <CleaningServicesIcon />,
        "ATM/cash machine on site": <AttachMoneyIcon />,
        "Fax/photocopying": <PrintIcon />,
        "Currency exchange": <CurrencyExchangeIcon />,
        "Laundry": <LocalLaundryServiceIcon />,
        "Business centre": <BusinessCenterIcon />,
        "24-hour security": <SecurityIcon />,
        "Safety deposit box": <LockIcon />,
        "Lift": <ElevatorIcon />,
        "Iron": <IronIcon />,
        "Arabic": <LanguageIcon />,
        "English": <LanguageIcon />,
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Facilities of AYA Addis Hotel
            </Typography>
            <Typography variant="body2" gutterBottom>
                Great facilities! Review score, 8.1
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Most popular facilities
            </Typography>
            <List>
                {Array.isArray(facilities) && facilities.map((facility, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemIcon>
                            {facilityIcons[facility] || <CheckCircleOutlineIcon />}
                        </ListItemIcon>
                        <ListItemText primary={facility} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Facilities;