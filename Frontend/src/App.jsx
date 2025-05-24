import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import ButtonAppBar from "./components/Navbar/Navbar";
import Home from "./components/Home page/Home";
import News from "./components/News/News";
import Events from "./components/Events/Events";
import World from "./components/Destinations/World Heritage Sites/World";
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
import Managment from "./components/About/Managment";
import HistoricalHome from "./components/Destinations/Historical Landmarks/HistoricalHome";
import GuzaraCastlePage from "./components/Destinations/Historical Landmarks/GuzaraCastlePage";
import YismaNigusPage from "./components/Destinations/Historical Landmarks/YismaNigusPage";
import AyiteyefAdarashPage from "./components/Destinations/Historical Landmarks/AyiteyefAdarashPage";
import MaqedelaRidgePage from "./components/Destinations/Historical Landmarks/MaqedelaRidgePage";
import ShonkeVillagePage from "./components/Destinations/Historical Landmarks/ShonkeVillagePage";
import AnkoberLodgePage from "./components/Destinations/Historical Landmarks/AnkoberLodgePage";
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
import Bookings from "./components/profile/Bookings";
import Reserve from "./components/profile/Reserve";
import Profile from "./components/profile/Profile";
import LakeZengenaPage from "./components/Destinations/Lakes,waterfall/LakeZengenaPage";
import LakeTirbaPage from "./components/Destinations/Lakes,waterfall/LakeTirbaPage";
import LakeHayqPage from "./components/Destinations/Lakes,waterfall/LakeHayqPage";
import WanzayeHotspringPage from "./components/Destinations/Lakes,waterfall/WanzayeHotspringPage";
import BlueNileFallsPage from "./components/Destinations/Lakes,waterfall/BlueNileFallsPage";
import LakeTanaLakesPage from "./components/Destinations/Lakes,waterfall/LakeTanaLakesPage";
import ThingsToDo from "./components/things-to-do/ThingsToDo";
import HorsebackRidingPage from "./components/things-to-do/HorsebackRidingPage";
import CommunityTourismPage from "./components/things-to-do/CommunityTourismPage";
import BikingPage from "./components/things-to-do/BikingPage";
import FishingPage from "./components/things-to-do/FishingPage";
import BirdWatchingPage from "./components/things-to-do/BirdWatchingPage";
import HikingAndTrekkingPage from "./components/things-to-do/HikingAndTrekkingPage";
import Religious from "./components/Destinations/religious-sites/Religious";
import DebreBirhaneSellassiePage from "./components/Destinations/religious-sites/DebreBirhaneSellassiePage";
import ZozAmbaGyorgisPage from "./components/Destinations/religious-sites/ZozAmbaGyorgisPage";
import DimaGiorgisMonasteryPage from "./components/Destinations/religious-sites/DimaGiorgisMonasteryPage";
import GeneteMaryamPage from "./components/Destinations/religious-sites/GeneteMaryamPage";
import AshetonMaryamPage from "./components/Destinations/religious-sites/AshetonMaryamPage";
import HayikEstifanosMonasteryPage from "./components/Destinations/religious-sites/HayikEstifanosMonasteryPage";
import JemaNigusMosquePage from "./components/Destinations/religious-sites/JemaNigusMosquePage";
import LakeTanaMonasteriesPage from "./components/Destinations/religious-sites/LakeTanaMonasteriesPage";
import YemrehanaKrestosMonasteryPage from "./components/Destinations/religious-sites/YemrehanaKrestosMonasteryPage";
import GishenPage from "./components/Destinations/religious-sites/GishenPage";
import TedbabeMariamMonasteryPage from "./components/Destinations/religious-sites/TedbabeMariamMonasteryPage";
import MertuleMariamMonasteryPage from "./components/Destinations/religious-sites/MertuleMariamMonasteryPage";
import AbuneMelkezedekMonasteryPage from "./components/Destinations/religious-sites/AbuneMelkezedekMonasteryPage";
function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Authentication check and user data fetch
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      console.log("App.js: checkAuth - storedUser:", storedUser);
      console.log("App.js: checkAuth - token:", token);

      if (token && storedUser) {
        try {
          const response = await axios.get("http://localhost:2000/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data;
          const userWithImage = {
            ...userData,
            passportOrId: userData.passportOrId.includes(
              "http://localhost:2000/uploads/"
            )
              ? userData.passportOrId
              : `http://localhost:2000/uploads/${userData.passportOrId
                  .split("\\")
                  .pop()}` || "https://via.placeholder.com/32",
          };
          console.log("App.js: checkAuth - Fetched user data:", userWithImage);
          console.log(
            "App.js: checkAuth - passportOrId:",
            userWithImage.passportOrId
          );
          setUser(userWithImage);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userWithImage));
        } catch (error) {
          console.error("App.js: Session validation failed:", error);
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
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
        setUserLocation("Lalibela");
        setPermissionGranted(true);
      }
    );
  }, []);

  const handleLocationChange = (event) => {
    setUserLocation(event.target.value);
  };

  const handleLogin = (userData) => {
    const userWithImage = {
      ...userData,
      passportOrId: userData.passportOrId.includes(
        "http://localhost:2000/uploads/"
      )
        ? userData.passportOrId
        : `http://localhost:2000/uploads/${userData.passportOrId
            .split("\\")
            .pop()}` || "https://via.placeholder.com/32",
    };
    console.log("App.js: handleLogin - Logged in user:", userWithImage);
    console.log(
      "App.js: handleLogin - passportOrId:",
      userWithImage.passportOrId
    );
    setIsAuthenticated(true);
    setUser(userWithImage);
    localStorage.setItem("user", JSON.stringify(userWithImage));
    localStorage.setItem("token", userData.token);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

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
      <ButtonAppBar
        isLoggedIn={isAuthenticated}
        onLogout={handleLogout}
        user={user}
      />

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
        <Route path="/religious-sites" element={<Religious />} />
        <Route
          path="/religious-sites/debre-birhane-sellassie"
          element={<DebreBirhaneSellassiePage />}
        />
        <Route
          path="/religious-sites/zoz-amba-gyorgis"
          element={<ZozAmbaGyorgisPage />}
        />
        <Route
          path="/religious-sites/dima-giorgis-monastery"
          element={<DimaGiorgisMonasteryPage />}
        />
        <Route
          path="/religious-sites/genete-maryam"
          element={<GeneteMaryamPage />}
        />
        <Route
          path="/religious-sites/asheton-maryam"
          element={<AshetonMaryamPage />}
        />
        <Route
          path="/religious-sites/hayik-estifanos-monastery"
          element={<HayikEstifanosMonasteryPage />}
        />
        <Route
          path="/religious-sites/jema-nigus-mosque"
          element={<JemaNigusMosquePage />}
        />
        <Route
          path="/religious-sites/lake-tana-monasteries"
          element={<LakeTanaMonasteriesPage />}
        />
        <Route
          path="/religious-sites/yemrehana-krestos-monastery"
          element={<YemrehanaKrestosMonasteryPage />}
        />
        <Route path="/religious-sites/gishen" element={<GishenPage />} />
        <Route
          path="/religious-sites/tedbabe-mariam-monastery"
          element={<TedbabeMariamMonasteryPage />}
        />
        <Route
          path="/religious-sites/mertule-mariam-monastery"
          element={<MertuleMariamMonasteryPage />}
        />
        <Route
          path="/religious-sites/abune-melkezedek-monastery"
          element={<AbuneMelkezedekMonasteryPage />}
        />{" "}
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
        <Route
          path="/lakes-hot-springs-waterfalls/lake-zengena"
          element={<LakeZengenaPage />}
        />
        <Route
          path="/lakes-hot-springs-waterfalls/lake-tirba"
          element={<LakeTirbaPage />}
        />
        <Route
          path="/lakes-hot-springs-waterfalls/wanzaye-hot spring"
          element={<WanzayeHotspringPage />}
        />
        <Route
          path="/lakes-hot-springs-waterfalls/lake-hayq"
          element={<LakeHayqPage />}
        />
        <Route
          path="/lakes-hot-springs-waterfalls/blue-nile-falls"
          element={<BlueNileFallsPage />}
        />
        <Route
          path="/lakes-hot-springs-waterfalls/lake-tana"
          element={<LakeTanaLakesPage />}
        />
        <Route path="/historical" element={<HistoricalHome />} />
        <Route
          path="/historical/guzara-castle"
          element={<GuzaraCastlePage />}
        />
        <Route path="/historical/yisma-nigus" element={<YismaNigusPage />} />
        <Route
          path="/historical/ayiteyef-adarash"
          element={<AyiteyefAdarashPage />}
        />
        <Route
          path="/historical/maqedela-ridge"
          element={<MaqedelaRidgePage />}
        />
        <Route
          path="/historical/shonke-village"
          element={<ShonkeVillagePage />}
        />
        <Route
          path="/historical/ankober-lodge"
          element={<AnkoberLodgePage />}
        />
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
        <Route path="/events/gen recognized" element={<GennaPage />} />
        <Route path="/events/timket" element={<TimketPage />} />
        <Route path="/events/fasika" element={<FasikaPage />} />
        <Route path="/things-to-do" element={<ThingsToDo />} />
        <Route
          path="/things-to-do/horseback-riding"
          element={<HorsebackRidingPage />}
        />
        <Route
          path="/things-to-do/community-tourism"
          element={<CommunityTourismPage />}
        />
        <Route path="/things-to-do/biking" element={<BikingPage />} />
        <Route path="/things-to-do/fishing" element={<FishingPage />} />
        <Route
          path="/things-to-do/bird-watching"
          element={<BirdWatchingPage />}
        />
        <Route
          path="/things-to-do/hiking-and-trekking"
          element={<HikingAndTrekkingPage />}
        />
        <Route path="/flights" element={<Flight />} />
        <Route path="/hotelslocation" element={<HotelsandLocations />} />
        <Route path="/filtered-hotels" element={<FilteredHotels />} />
        <Route path="/hoteldetails" element={<HotelDetails />} />
        <Route path="/hotel/:id" element={<HotelsLodges />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/amhara" element={<AmharaBoth />} />
        <Route path="/bureau" element={<Bureau />} />
        <Route path="/mandate" element={<Merge />} />
        <Route path="/management" element={<Managment />} />
        {isAuthenticated && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/reserve" element={<Reserve />} />
          </>
        )}
      </Routes>

      <ChatbotLogic />
      <Footer />
    </Box>
  );
}

export default App;
