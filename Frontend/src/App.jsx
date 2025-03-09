import React, { useState, useEffect } from "react";
import ButtonAppBar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home page/Home";
import News from "./components/News/News";
import EventsBoth from "./components/Events/EventsBoth";
import ThingsToDo from "./components/Things To Do/DoThings";
import World from "./components/Destinations/World Heritage Sites/World";
import ReligiousHome from "./components/Destinations/Religious Sites/ReligiousHome";
import Flight from "./components/Tourist Facilities/Flights/Flight";
import HotelsandLocations from "./components/Tourist Facilities/Hotels and Lodges/HotelsandLocations";
import FilteredHotels from "./components/Tourist Facilities/Hotels and Lodges/FilteredHotels";
import HotelList from "./components/Tourist Facilities/Hotels and Lodges/HotelLists";
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
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Simple location detection (replace with actual coordinates)
        if (latitude >= 12.5 && latitude <= 12.7) {
          // Lalibela
          setUserLocation("Lalibela");
        } else if (latitude >= 12.3 && latitude <= 12.5) {
          // Gondar
          setUserLocation("Gondar");
        } else if (latitude >= 11.5 && latitude <= 11.7) {
          // Bahir Dar
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
    <>
      <ButtonAppBar />

      <Routes>
        <Route path="/worldheritagesites" element={<World />} />
        <Route path="/religioussites" element={<ReligiousHome />} />
        <Route path="/nationalparks" element={<NationalParksHome />} />
        <Route path="/lakeAndWaterfall" element={<LakesAndWaterfallHome />} />
        <Route path="/historicalLandmarks" element={<HistoricalHome />} />
        <Route path="/" element={<Home location={userLocation} />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<EventsBoth />} />
        <Route path="/things" element={<ThingsToDo />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/hotelslocation" element={<HotelsandLocations />} />
        <Route path="/filtered-hotels" element={<FilteredHotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/amhara" element={<AmharaBoth />} />
        <Route path="/bureau" element={<Bureau />} />
        <Route path="/mandate" element={<Merge />} />
        <Route path="/managment" element={<Managment />} />
      </Routes>
      <ChatbotLogic />
      <Footer />
    </>
  );
}

export default App;
