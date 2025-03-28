import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ReactCountryFlag from "react-country-flag";
import {
  Help as HelpIcon,
  Login as LoginIcon,
  Book as BookIcon,
  CardGiftcard as RewardsIcon,
  NewReleases as NewIcon,
  Favorite as WishlistIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { debounce } from "lodash";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


// Define the color palette
const colors = {
  primary: "#222831",
  secondary: "#393E46",
  accent: "#00ADB5",
  background: "#EEEEEE",
  searchModalBackground: "#393E46",
};

// Styled components
const StyledLanguageButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${colors.secondary}`,
  "&:hover": {
    backgroundColor: colors.accent,
  },
}));

const LanguageModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const LanguageModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: colors.background,
  border: `2px solid ${colors.primary}`,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  borderRadius: theme.shape.borderRadius,
  minWidth: 300,
  maxWidth: 800,
}));

const LanguageButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const StyledLinkButton = styled(Button)(({ theme }) => ({
  textDecoration: "none",
  color: colors.background,
  "&:hover": {
    backgroundColor: colors.accent,
  },
}));

const StyledAccountButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${colors.secondary}`,
  "&:hover": {
    backgroundColor: colors.accent,
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: colors.background,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  marginRight: theme.spacing(2),
  position: "relative",
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: colors.secondary,
    color: colors.background,
    "& .MuiMenuItem-root": {
      "&:hover": {
        backgroundColor: colors.accent,
      },
    },
  },
}));

const SearchResultsDropdown = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: colors.searchModalBackground,
  border: `1px solid ${colors.secondary}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  zIndex: 1,
  maxHeight: 300,
  overflowY: "auto",
}));

const SearchResultItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  color: colors.background,
  "&:hover": {
    backgroundColor: colors.accent,
    color: colors.background,
  },
}));

const ProfileImage = styled('img')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '8px',
});

// List of supported languages
const languages = [
  { name: "English", code: "US" },
  { name: "Amharic", code: "ET" },
  { name: "French", code: "FR" },
  { name: "Spanish", code: "ES" },
];


// Expanded search data to include all searchable items
const searchData = [
  { name: "Hotels and Locations", path: "/hotelslocation" },
  { name: "Filtered Hotels", path: "/filtered-hotels" },
  { name: "Hotel Details", path: "/hoteldetails" },
  { name: "Unison Hotel", path: "/hotel/1" },
  { name: "Leoages Lodge", path: "/hotel/2" },
  { name: "Sign Up", path: "/signup" },
];

export default function Navbar({ isLoggedIn, onLogout, user }) {

// Original handleLogout outside the component
const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setSuccess("Logged out successfully!");
  setError("");
  onLogout();
  navigate("/login");
};

export default function ButtonAppBar({ isLoggedIn, onLogout }) {

  const [anchorElTourist, setAnchorElTourist] = useState(null);
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElDestination, setAnchorElDestination] = useState(null);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedInState, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Sync local state with prop
  useEffect(() => {
    setIsLoggedIn(isLoggedIn); // Sync with prop from App.jsx
  }, [isLoggedIn]);

  // Expanded search data to include all searchable items
  const searchData = [
    { name: "Hotels and Locations", path: "/hotelslocation" },
    { name: "Filtered Hotels", path: "/filtered-hotels" },
    { name: "Hotel Details", path: "/hoteldetails" },
    { name: "Unison Hotel", path: "/hotel/1" },
    { name: "Leoages Lodge", path: "/hotel/2" },
    { name: "Sign Up", path: "/signup" },
  ];


  // Debounced search function
  const handleSearch = debounce((query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = searchData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, 300);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Handle search result click
  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchBoxOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Close search box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxOpen && !event.target.closest(".search-box")) {
        setSearchBoxOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchBoxOpen]);

  // Handlers for Destinations menu
  const handleOpenDestination = (event) => {
    setAnchorElDestination(event.currentTarget);
  };

  const handleCloseDestination = () => {
    setAnchorElDestination(null);
  };

  // Handlers for Tourist Facilities menu
  const handleOpenTourist = (event) => {
    setAnchorElTourist(event.currentTarget);
  };

  const handleCloseTourist = () => {
    setAnchorElTourist(null);
  };

  // Handlers for About menu
  const handleOpenAbout = (event) => {
    setAnchorElAbout(event.currentTarget);
  };

  const handleCloseAbout = () => {
    setAnchorElAbout(null);
  };

  // Handlers for User menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handlers for Language modal
  const handleOpenLanguageModal = () => {
    setLanguageModalOpen(true);
  };

  const handleCloseLanguageModal = () => {
    setLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    handleCloseLanguageModal();
  };

  // Handle logout inside the component
  const handleLogoutInside = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSuccess("Logged out successfully!");
    setError("");
    onLogout();
    navigate("/login");
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: colors.primary,
          marginBottom: "-500px",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Visit Amhara
            </Link>
          </Typography>
          <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
            {/* Search Icon and Search Box */}
            <Box className="search-box">
              {searchBoxOpen ? (
                <SearchBox>
                  <InputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    autoFocus
                  />
                  <IconButton onClick={() => setSearchBoxOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </SearchBox>
              ) : (
                <IconButton color="inherit" onClick={() => setSearchBoxOpen(true)}>
                  <SearchIcon />
                </IconButton>
              )}
              {searchBoxOpen && searchResults.length > 0 && (
                <SearchResultsDropdown>
                  {searchResults.map((result, index) => (
                    <SearchResultItem
                      key={index}
                      onClick={() => handleSearchResultClick(result.path)}
                    >
                      {result.name}
                    </SearchResultItem>
                  ))}
                </SearchResultsDropdown>
              )}
            </Box>

            {/* Destinations Menu */}
            <Box
              onMouseEnter={handleOpenDestination}
              onMouseLeave={handleCloseDestination}
            >
              <Button
                id="destination-button"
                aria-haspopup="true"
                aria-controls="destination-menu"
                color="inherit"
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                Destinations
              </Button>
              <StyledMenu
                id="destination-menu"
                anchorEl={anchorElDestination}
                open={Boolean(anchorElDestination)}
                onClose={handleCloseDestination}
                MenuListProps={{
                  "aria-labelledby": "destination-button",
                }}
                onMouseLeave={handleCloseDestination}
              >
                <MenuItem onClick={handleCloseDestination}>
                  <Link
                    to="/things"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Things to Do
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDestination}>
                  <Link
                    to="/worldheritagesites"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    World Heritage Sites
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDestination}>
                  <Link
                    to="/nationalparks"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    National Parks and Community Protected Area
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDestination}>
                  <Link
                    to="/lakeAndWaterfall"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Lakes, Hot Springs and Water Falls
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDestination}>
                  <Link
                    to="/religioussites"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Religious Sites
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDestination}>
                  <Link
                    to="/historicalLandmarks"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Historical Landmarks
                  </Link>
                </MenuItem>
              </StyledMenu>
            </Box>

            {/* Tourist Facilities Menu */}
            <Box
              onMouseEnter={handleOpenTourist}
              onMouseLeave={handleCloseTourist}
            >
              <Button
                id="tourist-button"
                aria-haspopup="true"
                aria-controls="tourist-menu"
                color="inherit"
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                Tourist Facilities
              </Button>
              <StyledMenu
                id="tourist-menu"
                anchorEl={anchorElTourist}
                open={Boolean(anchorElTourist)}
                onClose={handleCloseTourist}
                MenuListProps={{
                  "aria-labelledby": "tourist-button",
                }}
                onMouseLeave={handleCloseTourist}
              >
                <MenuItem onClick={handleCloseTourist}>
                  <Link
                    to="/flights"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Flights
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseTourist}>
                  <Link
                    to="/hotelslocation"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Hotels and Lodges
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseTourist}>
                  Tourist Information Centers
                </MenuItem>
                <MenuItem onClick={handleCloseTourist}>
                  Other Service Providers
                </MenuItem>
              </StyledMenu>
            </Box>

            {/* Events Link */}
            <Link
              to="/events"
              style={{ textDecoration: "none", color: colors.background }}
            >
              Events
            </Link>

            {/* Language Modal */}
            <StyledLanguageButton
              id="language-button"
              onClick={handleOpenLanguageModal}
              color="inherit"
            >
              <LanguageIcon />
            </StyledLanguageButton>
            <LanguageModal
              open={languageModalOpen}
              onClose={handleCloseLanguageModal}
              aria-labelledby="language-modal-title"
              aria-describedby="language-modal-description"
            >
              <LanguageModalContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    id="language-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Select Language ({selectedLanguage})
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseLanguageModal}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <LanguageButtonContainer>
                  {languages.map((language) => (
                    <Button
                      key={language.name}
                      variant={
                        selectedLanguage === language.name
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleLanguageSelect(language.name)}
                      startIcon={
                        <ReactCountryFlag countryCode={language.code} svg />
                      }
                      sx={{
                        backgroundColor:
                          selectedLanguage === language.name
                            ? colors.accent
                            : "transparent",
                        color: colors.background,
                        "&:hover": {
                          backgroundColor: colors.accent,
                        },
                      }}
                    >
                      {language.name}
                    </Button>
                  ))}
                </LanguageButtonContainer>
              </LanguageModalContent>
            </LanguageModal>

            {/* Account Button with Profile Image */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StyledAccountButton
                id="account-button"
                onClick={handleOpenUserMenu}
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center' }}
              >

                {isLoggedIn && user?.profileImage ? (
                  <>
                    <ProfileImage src={user.profileImage} alt="Profile" />
                    <ArrowDropDown />
                  </>
                ) : (
                  <>
                    <AccountCircle />
                    <ArrowDropDown />
                  </>
                )}

                <AccountCircle />
                <ArrowDropDown />

              </StyledAccountButton>
              <StyledMenu
                id="user-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  "aria-labelledby": "account-button",
                }}
              >
                {isLoggedIn ? (
                  <>
                    <MenuItem onClick={() => {
                      navigate("/profile");
                      handleCloseUserMenu();
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {user?.profileImage && (
                          <ProfileImage 
                            src={user.profileImage} 
                            alt="Profile" 
                            sx={{ mr: 2 }}
                          />
                        )}
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {user?.name || 'My Profile'}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.accent }}>
                            {user?.email || ''}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/bookings");
                      handleCloseUserMenu();
                    }}>
                      <BookIcon sx={{ mr: 2 }} />
                      Booking
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/reserve");
                      handleCloseUserMenu();
                    }}>
                      <RewardsIcon sx={{ mr: 2 }} />
                      Reserve
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/new");
                      handleCloseUserMenu();
                    }}>
                      <NewIcon sx={{ mr: 2 }} />
                      New!
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/wishlists");
                      handleCloseUserMenu();
                    }}>
                      <WishlistIcon sx={{ mr: 2 }} />
                      Wishlists
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/profile");
                      handleCloseUserMenu();
                    }}>
                      <ProfileIcon sx={{ mr: 2 }} />
                      Profile Settings
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/help");
                      handleCloseUserMenu();
                    }}>
                      <HelpIcon sx={{ mr: 2 }} />
                      Help
                    </MenuItem>
                    <MenuItem onClick={handleLogoutInside}>
                      <LogoutIcon sx={{ mr: 2 }} />
                      Log out
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => {
                      navigate("/help");
                      handleCloseUserMenu();
                    }}>
                      <HelpIcon sx={{ mr: 2 }} />
                      Help
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate("/login");
                      handleCloseUserMenu();
                    }}>
                      <LoginIcon sx={{ mr: 2 }} />
                      Login/Sign Up
                    </MenuItem>
                  </>
                )}
              </StyledMenu>
            </Box>

            {/* About Menu */}
            <Box
              onMouseEnter={handleOpenAbout}
              onMouseLeave={handleCloseAbout}
            >
              <Button
                id="about-button"
                aria-haspopup="true"
                aria-controls="about-menu"
                color="inherit"
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                About
              </Button>
              <StyledMenu
                id="about-menu"
                anchorEl={anchorElAbout}
                open={Boolean(anchorElAbout)}
                onClose={handleCloseAbout}
                MenuListProps={{
                  "aria-labelledby": "about-button",
                }}
                onMouseLeave={handleCloseAbout}
              >
                <MenuItem onClick={handleCloseAbout}>
                  <Link
                    to="/amhara"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Amhara Region
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseAbout}>
                  <Link
                    to="/bureau"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    The Bureau
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseAbout}>
                  <Link
                    to="/management"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Our Management
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseAbout}>
                  <Link
                    to="/mandate"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Mandate and Responsibility
                  </Link>
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add padding to prevent content overlap */}
      <Box sx={{ paddingTop: "64px" }}></Box>

      {/* Success and Error Messages */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}