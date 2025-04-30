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
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import ReactCountryFlag from "react-country-flag";
import {
  Help as HelpIcon,
  Login as LoginIcon,
  Book as BookIcon,
  CardGiftcard as RewardsIcon,
  Favorite as WishlistIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { debounce } from "lodash";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Import logo using ES module syntax
import logo from '../../assets/logo/logo.png';

// Define the color palette
const colors = {
  primary: "#222831",
  secondary: "#393E46",
  accent: "#00ADB5",
  background: "#EEEEEE",
  searchModalBackground: "#393E46",
};

// Styled components
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

const ProfileImage = styled("img")({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "8px",
});

// Logo styles
const LogoImage = styled("img")({
  height: "40px",
  marginRight: "10px",
  verticalAlign: "middle",
});

// List of supported languages
const languages = [
  { name: "English", code: "US" },
  { name: "Amharic", code: "ET" },
  { name: "French", code: "FR" },
  { name: "Spanish", code: "ES" },
];

export default function Navbar({
  isLoggedIn = false,
  onLogout = () => {},
  user = null,
}) {
  const [anchorElTourist, setAnchorElTourist] = useState(null);
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElDestination, setAnchorElDestination] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedInState, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Sync local state with props
  useEffect(() => {
    setIsLoggedIn(isLoggedIn);
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

  // Handlers for Language menu
  const handleOpenLanguage = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguage = () => {
    setAnchorElLanguage(null);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    handleCloseLanguage();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSuccess("Logged out successfully!");
    setError("");
    onLogout();
    navigate("/login");
    handleCloseUserMenu();
  };

  // Compute full name
  const fullName = user?.firstName && user?.middleName
    ? `${user.firstName} ${user.middleName}`
    : "My Profile";

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
            <Link to="/" style={{ textDecoration: "none", color: "inherit", display: 'flex', alignItems: 'center' }}>
              <LogoImage 
                src={logo} 
                alt="Visit Amhara" 
              />
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
                <IconButton
                  color="inherit"
                  onClick={() => setSearchBoxOpen(true)}
                >
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
                    to="/national-parks"
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
                  <Link
                    to="/tourist-information-center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Tourist Information Centers
                  </Link>
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

            {/* Account Button with Profile Image */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StyledAccountButton
                id="account-button"
                onClick={handleOpenUserMenu}
                color="inherit"
                sx={{ display: "flex", alignItems: "center" }}
              >
              {isLoggedInState && user?.passportOrId ? (
  (() => {
    // Extract relative path by removing the absolute URL prefix
    let relativePath = user.passportOrId.replace(/^https?:\/\/[^\/]+\/?/, '');
    // Normalize slashes: replace backslashes with forward slashes
    relativePath = relativePath.replace(/\\/g, '/');
    // Prepend http://localhost:2000/ and ensure 'Uploads' case matches backend
    const fullPath = `http://localhost:2000/${relativePath.replace('uploads', 'Uploads')}`;
    console.log('Debug - Image Path:', {
      originalPath: user.passportOrId,
      constructedPath: fullPath,
      userData: user
    });
    return (
      <ProfileImage
        src={fullPath}
        alt="Profile"
        sx={{ mr: 2 }}
      />
    );
  })()
) : (
  <AccountCircle sx={{ fontSize: 32 }} />
)}
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
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {isLoggedInState ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleCloseUserMenu();
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                    {user.passportOrId ? (
  (() => {
    // Extract relative path by removing the absolute URL prefix
    let relativePath = user.passportOrId.replace(/^https?:\/\/[^\/]+\/?/, '');
    // Normalize slashes: replace backslashes with forward slashes
    relativePath = relativePath.replace(/\\/g, '/');
    // Prepend ../../ and ensure 'Uploads' case matches backend
    const fullPath = `http://localhost:2000/${relativePath.replace('uploads', 'uploads')}`;
    console.log('Debug - Image Path:', {
      originalPath: user.passportOrId,
      constructedPath: fullPath,
      userData: user
    });
    return (
      <ProfileImage
        src={fullPath}
        alt="Profile"
        sx={{ mr: 2 }}
      />
    );
  })()
) : (
  <AccountCircle sx={{ mr: 2, fontSize: 32 }} />
)}
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {fullName}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: colors.accent }}
                          >
                            {user?.email || "No email provided"}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/bookings");
                        handleCloseUserMenu();
                      }}
                    >
                      <BookIcon sx={{ mr: 2 }} />
                      Bookings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/reserve");
                        handleCloseUserMenu();
                      }}
                    >
                      <RewardsIcon sx={{ mr: 2 }} />
                      Reservations
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/wishlist");
                        handleCloseUserMenu();
                      }}
                    >
                      <WishlistIcon sx={{ mr: 2 }} />
                      Wishlist
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/profile/settings");
                        handleCloseUserMenu();
                      }}
                    >
                      <ProfileIcon sx={{ mr: 2 }} />
                      Profile Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/help");
                        handleCloseUserMenu();
                      }}
                    >
                      <HelpIcon sx={{ mr: 2 }} />
                      Help Center
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 2 }} />
                      Log out
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/help");
                        handleCloseUserMenu();
                      }}
                    >
                      <HelpIcon sx={{ mr: 2 }} />
                      Help Center
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/login");
                        handleCloseUserMenu();
                      }}
                    >
                      <LoginIcon sx={{ mr: 2 }} />
                      Login/Sign Up
                    </MenuItem>
                  </>
                )}
              </StyledMenu>
            </Box>

            {/* About Menu */}
            <Box onMouseEnter={handleOpenAbout} onMouseLeave={handleCloseAbout}>
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

            {/* Language Dropdown */}
            <Box
              onMouseEnter={handleOpenLanguage}
              onMouseLeave={handleCloseLanguage}
            >
              <Button
                id="language-button"
                aria-haspopup="true"
                aria-controls="language-menu"
                color="inherit"
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                Lang
              </Button>
              <StyledMenu
                id="language-menu"
                anchorEl={anchorElLanguage}
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguage}
                MenuListProps={{
                  "aria-labelledby": "language-button",
                }}
                onMouseLeave={handleCloseLanguage}
              >
                {languages.map((language) => (
                  <MenuItem
                    key={language.name}
                    onClick={() => handleLanguageSelect(language.name)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      backgroundColor:
                        selectedLanguage === language.name
                          ? colors.accent
                          : "transparent",
                    }}
                  >
                    <ReactCountryFlag countryCode={language.code} svg />
                    {language.name}
                  </MenuItem>
                ))}
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
        <Alert
          onClose={() => setSuccess("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}