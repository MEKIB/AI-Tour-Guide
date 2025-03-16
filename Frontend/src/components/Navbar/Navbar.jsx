import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ReactCountryFlag from "react-country-flag";

// Define the color palette
const colors = {
  primary: "#222831",
  secondary: "#393E46",
  accent: "#00ADB5",
  background: "#EEEEEE",
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

export default function ButtonAppBar() {
  const [anchorElTourist, setAnchorElTourist] = useState(null);
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElDestination, setAnchorElDestination] = useState(null);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle dropdown open
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
    handleCloseLanguageModal();
  };

  const languages = [
    { name: "English", code: "US" },
    { name: "Amharic", code: "ET" },
    { name: "Arabic", code: "SA" },
    { name: "Russian", code: "RU" },
    { name: "Oromiffa", code: "ET" },
    { name: "French", code: "FR" },
    { name: "Spanish", code: "ES" },
    { name: "German", code: "DE" },
  ];

  const handleSearchBoxToggle = () => {
    setSearchBoxOpen(true);
  };

  const handleSearchBoxClose = () => {
    setSearchBoxOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  const handleAccountClick = () => {
    navigate("/login");
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
            {searchBoxOpen ? (
              <SearchBox onBlur={handleSearchBoxClose}>
                <form onSubmit={handleSearchSubmit}>
                  <InputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    autoFocus
                  />
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </form>
              </SearchBox>
            ) : (
              <IconButton color="inherit" onClick={handleSearchBoxToggle}>
                <SearchIcon />
              </IconButton>
            )}

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

            {/* Account Button - Redirects to Login Page */}
            <StyledAccountButton
              id="account-button"
              onClick={handleAccountClick}
              color="inherit"
            >
              <AccountCircle />
            </StyledAccountButton>

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
                    to="/managment"
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
      <Box sx={{ paddingTop: "64px" }}>{/* Page content goes here */}</Box>
    </Box>
  );
}