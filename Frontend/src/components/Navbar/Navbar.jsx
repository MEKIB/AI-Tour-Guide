import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
const StyledLanguageButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LanguageModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LanguageModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  borderRadius: theme.shape.borderRadius,
  minWidth: 300,
  maxWidth: 800,
}));

const LanguageButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));


const StyledLinkButton = styled(Button)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white, // Or theme.palette.text.primary, depending on your theme
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Optional: add hover effect
  },
}));

const StyledAccountButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ButtonAppBar() {
  const [anchorElTourist, setAnchorElTourist] = useState(null);
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElDestination, setAnchorElDestination] = useState(null);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const handleOpenTourist = (event) => {
    setAnchorElTourist(event.currentTarget);
  };

  const handleCloseTourist = () => {
    setAnchorElTourist(null);
  };

  const handleOpenAbout = (event) => {
    setAnchorElAbout(event.currentTarget);
  };

  const handleCloseAbout = () => {
    setAnchorElAbout(null);
  };

  const handleOpenDestination = (event) => {
    setAnchorElDestination(event.currentTarget);
  };

  const handleCloseDestination = () => {
    setAnchorElDestination(null);
  };

  const handleOpenLanguageModal = () => {
    setLanguageModalOpen(true);
  };

  const handleCloseLanguageModal = () => {
    setLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Don't close the modal here!
  };

  const languages = ['English', 'Amharic', 'Arabic', 'Russian', 'Oromiffa', 'French', 'Spanish', 'German'];

  const handleOpenAccountModal = () => {
    setAccountModalOpen(true);
  };

  const handleCloseAccountModal = () => {
    setAccountModalOpen(false);
  };





  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>AI Tour Guide</Link> {/* Link to home */}
            </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button
              id="destination-button"
              aria-haspopup="true"
              aria-controls="destination-menu"
              onClick={handleOpenDestination}
              color="inherit"
            >
              Destinations
            </Button>
            <Menu
              id="destination-menu"
              anchorEl={anchorElDestination}
              open={Boolean(anchorElDestination)}
              onClose={handleCloseDestination}
              MenuListProps={{
                'aria-labelledby': 'destination-button',
              }}
            >
              <MenuItem onClick={() => { handleCloseDestination();}}><Link to='/things'>Things to Do</Link>              </MenuItem>
              <MenuItem onClick={() => { handleCloseDestination(); }}><Link to='/worldheritagesites'>World Heritage Sites</Link></MenuItem>
              <MenuItem onClick={() => { handleCloseDestination(); }}>National Parks and Community Protected Area</MenuItem>
              <MenuItem onClick={() => { handleCloseDestination(); }}>Lakes, Hot Springs and Water Falls</MenuItem>
              <MenuItem onClick={() => { handleCloseDestination(); }}><Link to='/religioussites'>Religious Sites</Link></MenuItem>
              <MenuItem onClick={() => { handleCloseDestination(); }}>Historical Landmarks</MenuItem>
            </Menu>
            <Button
              id="tourist-button"
              aria-haspopup="true"
              aria-controls="tourist-menu"
              onClick={handleOpenTourist}
              color="inherit"
            >
              Tourist Facilities
            </Button>
            <Menu
              id="tourist-menu"
              anchorEl={anchorElTourist}
              open={Boolean(anchorElTourist)}
              onClose={handleCloseTourist}
              MenuListProps={{
                'aria-labelledby': 'tourist-button',
              }}
            >
              <MenuItem onClick={() => { handleCloseTourist(); }}><Link to='/flights'>Flights</Link></MenuItem>
              <MenuItem onClick={() => { handleCloseTourist(); }}><Link to='/hotelslocation'>Hotels and Lodges</Link></MenuItem>
              <MenuItem onClick={() => { handleCloseTourist(); }}>Tourist Information Centers</MenuItem>
              <MenuItem onClick={() => { handleCloseTourist(); }}>Other Service Providers</MenuItem>
            </Menu>
            <StyledLinkButton component={Link} to="/events">
              Events
            </StyledLinkButton>












            <StyledLanguageButton
        id="language-button"
        onClick={handleOpenLanguageModal}
        color="inherit"
      >
        <LanguageIcon />
      </StyledLanguageButton>
      <LanguageModal
        open={languageModalOpen}
        onClose={() => {}} // prevent closing on backdrop click
        aria-labelledby="language-modal-title"
        aria-describedby="language-modal-description"
      >
        <LanguageModalContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="language-modal-title" variant="h6" component="h2">
              Select Language ({selectedLanguage})
            </Typography>
            <IconButton aria-label="close" onClick={handleCloseLanguageModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <LanguageButtonContainer>
            {languages.map((language) => (
              <Button
                key={language}
                variant={selectedLanguage === language ? 'contained' : 'outlined'}
                onClick={() => handleLanguageSelect(language)}
              >
                {language}
              </Button>
            ))}
          </LanguageButtonContainer>
        </LanguageModalContent>
      </LanguageModal>








      <StyledAccountButton
          id="account-button"
          onClick={handleOpenAccountModal}
          color="inherit"
        >
          <AccountCircle />
        </StyledAccountButton>
        <Modal
          open={accountModalOpen}
          onClose={handleCloseAccountModal}
          aria-labelledby="account-modal-title"
          aria-describedby="account-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="account-modal-title" variant="h6" component="h2">
              Account
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
              <Button component={Link} to="/login" variant="contained" color="primary">
                Login
              </Button>
              <Button component={Link} to="/signup" variant="outlined" color="primary">
                Signup
              </Button>
              <IconButton aria-label="close" onClick={handleCloseAccountModal} sx={{alignSelf:"flex-end", marginTop:2}}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Modal>











            <Button
              id="about-button"
              aria-haspopup="true"
              aria-controls="about-menu"
              onClick={handleOpenAbout}
              color="inherit"
            >
              About
            </Button>
            <Menu
              id="about-menu"
              anchorEl={anchorElAbout}
              open={Boolean(anchorElAbout)}
              onClose={handleCloseAbout}
              MenuListProps={{
                'aria-labelledby': 'about-button',
              }}
            >
              <MenuItem onClick={() => { handleCloseAbout(); }}>Amhara Region</MenuItem>
              <MenuItem onClick={() => { handleCloseAbout(); }}>The Bureau</MenuItem>
              <MenuItem onClick={() => { handleCloseAbout(); }}>Our Management</MenuItem>
              <MenuItem onClick={() => { handleCloseAbout(); }}>Mandate and Responsibility</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}