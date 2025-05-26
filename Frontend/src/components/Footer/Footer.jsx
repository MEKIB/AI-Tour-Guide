import React from "react";
import { Link as RouterLink } from "react-router-dom"; // For internal routing
import { Box, Typography, Link, Grid, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// Color Palette
const colors = {
  dark: "#222831", // Dark Gray
  mediumDark: "#393E46", // Medium Gray
  primary: "#00ADB5", // Teal
  light: "#EEEEEE", // Light Gray
};

// Global Styles
const titleStyle = {
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  color: colors.light,
  fontSize: "18px",
  marginBottom: "16px",
};

const linkStyle = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: colors.light,
  textDecoration: "none",
  "&:hover": { color: colors.primary, textDecoration: "underline" },
};

const socialIconStyle = {
  fontSize: "28px",
  marginRight: "10px",
  transition: "transform 0.3s ease, color 0.3s ease",
  color: colors.light,
  "&:hover": { transform: "scale(1.2)", color: colors.primary },
};

const contactIconStyle = {
  fontSize: "20px",
  marginRight: "8px",
  color: colors.primary,
};

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: colors.dark, padding: "2rem 0" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              About
            </Typography>
            <RouterLink to="/bureau" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>The Bureau</Typography>
            </RouterLink>
            <RouterLink to="/management" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Our Management</Typography>
            </RouterLink>
            <RouterLink to="/mandate" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Mandate and Responsibility</Typography>
            </RouterLink>
            <RouterLink to="/archive" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Archive (Publication)</Typography>
            </RouterLink>
            <Typography variant="body2" sx={{ mt: 2, color: colors.light }}>
              Follow us
            </Typography>
            <Box sx={{ display: "flex", mt: 1 }}>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIconStyle}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIconStyle}
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIconStyle}
              >
                <YouTubeIcon />
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIconStyle}
              >
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>

          {/* Destinations Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              Destinations
            </Typography>
            <RouterLink
              to="/worldheritagesites"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={linkStyle}>World Heritage Sites</Typography>
            </RouterLink>
            <RouterLink to="/national-parks" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>National Parks</Typography>
            </RouterLink>
            <RouterLink
              to="/lakeAndWaterfall"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={linkStyle}>
                Lakes, Hot Springs and Waterfalls
              </Typography>
            </RouterLink>
            <RouterLink
              to="/religious-sites"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={linkStyle}>Religious Sites</Typography>
            </RouterLink>
            <RouterLink to="/historical" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Historical Landmarks</Typography>
            </RouterLink>
          </Grid>

          {/* Tourist Facilities Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              Tourist Facilities
            </Typography>
            <RouterLink to="/flights" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Flights</Typography>
            </RouterLink>
            <RouterLink to="/hotelslocation" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Hotels and Lodges</Typography>
            </RouterLink>
            <RouterLink
              to="/tourist-information-center"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={linkStyle}>
                Tourist Information Centers
              </Typography>
            </RouterLink>
            <RouterLink
              to="/service-providers"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={linkStyle}>Other Service Providers</Typography>
            </RouterLink>
            <RouterLink to="/events" style={{ textDecoration: "none" }}>
              <Typography sx={linkStyle}>Events</Typography>
            </RouterLink>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              Contact us
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon sx={contactIconStyle} />
              <Typography variant="body2" sx={{ color: colors.light }}>
                Kebele 16, Bahir Dar, Ethiopia
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={contactIconStyle} />
              <Box>
                <Link href="tel:+251910741033" sx={linkStyle}>
                  +251 910741033
                </Link>
                <br />
                <Link href="tel:+251991801262" sx={linkStyle}>
                  +251 991801262
                </Link>
                <br />
                <Link href="tel:+251902797710" sx={linkStyle}>
                  +251 902797710
                </Link>
                <br />
                <Link href="tel:+251905487849" sx={linkStyle}>
                  +251 905487849
                </Link>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={contactIconStyle} />
              <Link href="mailto:aitourguide@gmail.com" sx={linkStyle}>
                aitourguide@gmail.com
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
