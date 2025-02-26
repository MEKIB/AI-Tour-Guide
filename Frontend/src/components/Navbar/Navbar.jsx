import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function ButtonAppBar() {
  const [anchorElTourist, setAnchorElTourist] = useState(null);
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElDestination, setAnchorElDestination] = useState(null);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              AI Tour Guide
            </Link>{" "}
            {/* Link to home */}
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
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
                "aria-labelledby": "destination-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseDestination();
                }}
              >
                <Link to="/worldheritagesites">World Heritage Sites</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseDestination();
                }}
              >
                National Parks and Community Protected Area
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseDestination();
                }}
              >
                Lakes, Hot Springs and Water Falls
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseDestination();
                }}
              >
                <Link to="/religioussites">Religious Sites</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseDestination();
                }}
              >
                Historical Landmarks
              </MenuItem>
            </Menu>
            <Link to="/things">Things to Do</Link>
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
                "aria-labelledby": "tourist-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseTourist();
                }}
              >
                <Link to="/flights">Flights</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseTourist();
                }}
              >
                <Link to="/hotelslocation">Hotels and Lodges</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseTourist();
                }}
              >
                Tourist Information Centers
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseTourist();
                }}
              >
                Other Service Providers
              </MenuItem>
            </Menu>
            <Link to="/events">Events</Link>
            <Link to="/news">News</Link>
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
                "aria-labelledby": "about-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseAbout();
                }}
              >
                <Link to="/amhara">Amhara Region</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAbout();
                }}
              >
                <Link to="/bureau">The Bureau</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAbout();
                }}
              >
                <Link to="/managment">Our Management</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAbout();
                }}
              >
                <Link to="/mandate">Mandate and Responsibility</Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
