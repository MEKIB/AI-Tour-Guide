import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ButtonAppBar from "./components/Navbar/Navbar";
import Home from "./components/Home page/Home";
import News from "./components/News/News";
import EventsBoth from "./components/Events/EventsBoth";
import ThingsToDo from "./components/Things To Do/DoThings";
import World from "./components/Destinations/World Heritage Sites/World";
import ReligiousHome from "./components/Destinations/Religious Sites/ReligiousHome";
import Flight from "./components/Tourist Facilities/Flights/Flight";
import HotelsandLocations from "./components/Tourist Facilities/Hotels and Lodges/HotelsandLocations";
import FilteredHotels from "./components/Tourist Facilities/Hotels and Lodges/FilteredHotels";
import HotelDetails from "./components/Tourist Facilities/Hotels and Lodges/HotelDetails";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/account/Signup";
import LoginPage from "./components/account/Login";
import ForgotPasswordPage from "./components/account/ForgotPassword";
import ResetPasswordPage from "./components/account/ResetPassword";
import ChatbotLogic from "./components/Chatbot/ChatbotLogic";
import Bureau from "./components/About/Bureau";
import AmharaBoth from "./components/About/Amhara/AmharaBoth";
import Merge from "./components/About/Mandate/Merge";
import Managment from "./components/About/OurManagment/Managment";
import HistoricalHome from "./components/Destinations/Historical Landmarks/HistoricalHome";
import LakesAndWaterfallHome from "./components/Destinations/Lakes,waterfall/LakesAndWaterfallHome";
import NationalParksHome from "./components/Destinations/National Parks and Community Protected Area/NationalParksHome";
import HotelsLodges from "./components/Tourist Facilities/Hotels and Lodges/HotelsLodges";
import HOMEPage from "./components/Home page/HOMEPage";
import Bookings from "./components/profile/Bookings";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Clear token on page load/refresh
  useEffect(() => {
    localStorage.removeItem("token"); // Remove token on refresh
    setIsAuthenticated(false); // Reset authentication state
  }, []); // Empty dependency array means this runs once on mount

  const handleLogin = () => {
    setIsAuthenticated(true); // Update state on login
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setIsAuthenticated(false); // Update state on logout
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Simple location detection (replace with actual coordinates)
        if (latitude >= 12.5 && latitude <= 12.7) {
          setUserLocation("Lalibela");
        } else if (latitude >= 12.3 && latitude <= 12.5) {
          setUserLocation("Gondar");
        } else if (latitude >= 11.5 && latitude <= 11.7) {
          setUserLocation("BahirDar");
        }
        setPermissionGranted(true);
      },
      (error) => {
        console.error("Location permission denied:", error);
        setUserLocation("Lalibela"); // Default location
        setPermissionGranted(true);
      }
    );
  }, []);

  // Function to handle location change
  const handleLocationChange = (event) => {
    setUserLocation(event.target.value);
  };

  return (
    <Box
      sx={{
        marginLeft: "-8px",
        padding: 2,
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#393E46",
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      <ButtonAppBar isLoggedIn={isAuthenticated} onLogout={handleLogout} />

      {/* Routes */}
      <Routes>
        <Route path="/worldheritagesites" element={<World />} />
        <Route path="/religioussites" element={<ReligiousHome />} />
        <Route path="/nationalparks" element={<NationalParksHome />} />
        <Route path="/lakeAndWaterfall" element={<LakesAndWaterfallHome />} />
        <Route path="/historicalLandmarks" element={<HistoricalHome />} />
        <Route path="/" element={<HOMEPage location={userLocation} />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<EventsBoth />} />
        <Route path="/things" element={<ThingsToDo />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/hotelslocation" element={<HotelsandLocations />} />
        <Route path="/filtered-hotels" element={<FilteredHotels />} />
        <Route path="/hoteldetails" element={<HotelDetails />} />
        <Route path="/hotel/:id" element={<HotelsLodges />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} onLogout={handleLogout} />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/amhara" element={<AmharaBoth />} />
        <Route path="/bureau" element={<Bureau />} />
        <Route path="/mandate" element={<Merge />} />
        <Route path="/managment" element={<Managment />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>

      {/* Chatbot */}
      <ChatbotLogic />

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App;