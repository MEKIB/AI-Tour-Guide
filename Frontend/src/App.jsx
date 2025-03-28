import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material"; // Import Box component
import ButtonAppBar from "./components/Navbar/Navbar";
import Home from "./components/Home page/Home";
import News from "./components/News/News";
import Events from "./components/Events/Events";
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
import AbuneYosephPage from "./components/Destinations/National Parks and Community Protected Area/AbuneYosephPage";
import SemienMountainsPage from "./components/Destinations/National Parks and Community Protected Area/SemienMountainsPage";
import GunaMountainPage from "./components/Destinations/National Parks and Community Protected Area/GunaMountainPage";
import ChokeMountainPage from "./components/Destinations/National Parks and Community Protected Area/ChokeMountainPage";
import BorenaSayintPage from "./components/Destinations/National Parks and Community Protected Area/BorenaSayintPage";
import MenzGuassaPage from "./components/Destinations/National Parks and Community Protected Area/MenzGuassaPage";
import AlitashPage from "./components/Destinations/National Parks and Community Protected Area/AlitashPage";
import AshendaPage from "./components/Events/AshendaPage";
import MerqoriosPage from "./components/Events/MerqoriosPage";
import FasikaPage from "./components/Events/FasikaPage";
import TimketPage from "./components/Events/TimketPage";
import GennaPage from "./components/Events/GennaPage";
import MeskelPage from "./components/Events/MeskelPage";
import SebatPage from "./components/Events/SebatPage";
import MewlidPage from "./components/Events/MewlidPage";
import TouristInformationCenter from "./components/Tourist Facilities/TouristInformationCenter";
import SemienMountainsHeritagePage from "./components/Destinations/World Heritage Sites/SemienMountainsHeritagePage";
import LalibelaHeritagePage from "./components/Destinations/World Heritage Sites/LalibelaHeritagePage";
import LakeTanaHeritagePage from "./components/Destinations/World Heritage Sites/LakeTanaHeritagePage";
import FasilGhebbiHeritagePage from "./components/Destinations/World Heritage Sites/FasilGhebbiHeritagePage";
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
    <Box
      sx={{
        marginLeft: "-8px", // Remove default margin
        // marginBottom:'20px',
        padding: 2, // Remove default padding
        width: "100%", // Ensure full width
        minHeight: "100vh", // Ensure full height
        backgroundColor: "#393E46", // Set background color
        overflowX: "hidden", // Prevent horizontal overflow
      }}
    >
      {/* Navbar */}
      <ButtonAppBar />

      {/* Routes */}
      <Routes>
        <Route path="/worldheritagesites" element={<World />} />
        <Route
          path="/worldheritagesites/semienmountains"
          element={<SemienMountainsHeritagePage />}
        />
        <Route
          path="/worldheritagesites/lalibela"
          element={<LalibelaHeritagePage />}
        />
        <Route
          path="/worldheritagesites/fasilghebbi"
          element={<FasilGhebbiHeritagePage />}
        />

        <Route
          path="/worldheritagesites/lakeTana"
          element={<LakeTanaHeritagePage />}
        />

        <Route path="/religioussites" element={<ReligiousHome />} />
        <Route path="/national-parks" element={<NationalParksHome />} />
        <Route
          path="/national-parks/abune-yoseph"
          element={<AbuneYosephPage />}
        />
        <Route
          path="/national-parks/semien-mountains"
          element={<SemienMountainsPage />}
        />
        <Route
          path="/national-parks/guna-mountain"
          element={<GunaMountainPage />}
        />
        <Route
          path="/national-parks/choke-mountain"
          element={<ChokeMountainPage />}
        />
        <Route
          path="/national-parks/borena-sayint"
          element={<BorenaSayintPage />}
        />
        <Route
          path="/national-parks/menz-guassa"
          element={<MenzGuassaPage />}
        />
        <Route path="/national-parks/alitash" element={<AlitashPage />} />
        <Route path="/lakeAndWaterfall" element={<LakesAndWaterfallHome />} />
        <Route path="/historicalLandmarks" element={<HistoricalHome />} />
        <Route
          path="/tourist-information-center"
          element={<TouristInformationCenter />}
        />
        <Route path="/" element={<HOMEPage location={userLocation} />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/merqorios" element={<MerqoriosPage />} />
        <Route path="/events/sebat" element={<SebatPage />} />
        <Route path="/events/mewlid" element={<MewlidPage />} />
        <Route path="/events/ashenda" element={<AshendaPage />} />
        <Route path="/events/meskel" element={<MeskelPage />} />
        <Route path="/events/genna" element={<GennaPage />} />
        <Route path="/events/timket" element={<TimketPage />} />
        <Route path="/events/fasika" element={<FasikaPage />} />
        <Route path="/things" element={<ThingsToDo />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/hotelslocation" element={<HotelsandLocations />} />
        <Route path="/filtered-hotels" element={<FilteredHotels />} />
        <Route path="/hoteldetails" element={<HotelDetails />} />
        <Route path="/hotel/:id" element={<HotelsLodges />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/amhara" element={<AmharaBoth />} />
        <Route path="/bureau" element={<Bureau />} />
        <Route path="/mandate" element={<Merge />} />
        <Route path="/managment" element={<Managment />} />
      </Routes>

      {/* Chatbot */}
      <ChatbotLogic />

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App;
