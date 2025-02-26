import React from 'react'
import ButtonAppBar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home page/Home'
import News from './components/News/News'
import Events from './components/Events/Events'
import ThingsToDo from './components/Things To Do/DoThings'
import World from './components/Destinations/World Heritage Sites/World'
import ReligiousHome from './components/Destinations/Religious Sites/ReligiousHome'
import Flight from './components/Tourist Facilities/Flights/Flight'
import HotelsandLocations from './components/Tourist Facilities/Hotels and Lodges/HotelsandLocations'
import FilteredHotels from './components/Tourist Facilities/Hotels and Lodges/FilteredHotels'
import HotelDetails from './components/Tourist Facilities/Hotels and Lodges/HotelDetails'
import Footer from './components/Footer/Footer'
import SignupPage from './components/account/Signup'
import LoginPage from './components/account/Login'
import ForgotPasswordPage from './components/account/ForgotPassword'
import ResetPasswordPage from './components/account/ResetPassword'

function App() {
  return (
    <>
    <ButtonAppBar/>
    <Routes>
      <Route path='/worldheritagesites' element={<World/>}/>
      <Route path='/religioussites' element={<ReligiousHome/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/things' element={<ThingsToDo/>}/>
      <Route path='/flights' element={<Flight/>}/>
      <Route path='/hotelslocation' element={<HotelsandLocations/>}/>
      <Route path='/filtered-hotels' element={<FilteredHotels/>}/>
      <Route path='/hotel/:id' element={<HotelDetails/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/reset-password' element={<ResetPasswordPage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App