<<<<<<< HEAD
=======

>>>>>>> 74ff7eaa4f0142be70deb5155416c3b731f9c2f8

import React from 'react';
import ButtonAppBar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home page/Home';
import News from "./components/News/News";
import EventsBoth from "./components/Events/EventsBoth";
import ThingsToDo from './components/Things To Do/DoThings';
import World from './components/Destinations/World Heritage Sites/World';
import ReligiousHome from './components/Destinations/Religious Sites/ReligiousHome';
import Flight from './components/Tourist Facilities/Flights/Flight';
import HotelsandLocations from './components/Tourist Facilities/Hotels and Lodges/HotelsandLocations';
import FilteredHotels from './components/Tourist Facilities/Hotels and Lodges/FilteredHotels';
import HotelList from './components/Tourist Facilities/Hotels and Lodges/HotelLists';
import HotelDetails from './components/Tourist Facilities/Hotels and Lodges/HotelDetails';
import Footer from './components/Footer/Footer';
import SignupPage from './components/account/Signup';
import LoginPage from './components/account/Login';
import ForgotPasswordPage from './components/account/ForgotPassword';
import ResetPasswordPage from './components/account/ResetPassword';
import Availability from './components/Tourist Facilities/Hotels and Lodges/Avaliability';
import ChatbotLogic from './components/Chatbot/ChatbotLogic'; // Import the ChatbotLogic component
<<<<<<< HEAD

=======
import Bureau from "./components/About/Bureau";
import AmharaBoth from "./components/About/Amhara/AmharaBoth";
import Merge from "./components/About/Mandate/Merge";
import Managment from "./components/About/OurManagment/Managment";
>>>>>>> 74ff7eaa4f0142be70deb5155416c3b731f9c2f8

function App() {
  return (
    <>

      <ButtonAppBar />
      <Routes>
        <Route path="/worldheritagesites" element={<World />} />
        <Route path="/religioussites" element={<ReligiousHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />

        <Route path="/events" element={<EventsBoth />} />

        <Route path="/things" element={<ThingsToDo />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/hotelslocation" element={<HotelsandLocations />} />
        <Route path="/filtered-hotels" element={<FilteredHotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
=======

>>>>>>> 74ff7eaa4f0142be70deb5155416c3b731f9c2f8
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
           <Route path="/amhara" element={<AmharaBoth />} />
        <Route path="/bureau" element={<Bureau />} />
        <Route path="/mandate" element={<Merge />} />
        <Route path="/managment" element={<Managment />} />
      </Routes>

      {/* Add the ChatbotLogic component here */}
      <ChatbotLogic />

      <Footer />

    </>
  );
}

export default App;
