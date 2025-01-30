import React from 'react'
import ButtonAppBar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home page/Home'
import News from './components/News/News'
import Events from './components/Events/Events'
import ThingsToDo from './components/Things To Do/DoThings'
import HotelsandLocations from './components/Hotels and Lodges/HotelsandLocations'
import World from './components/Destinations/World Heritage Sites/World'
import ReligiousHome from './components/Destinations/Religious Sites/ReligiousHome'
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
      <Route path='/hotelslocation' element={<HotelsandLocations/>}/>
    </Routes>
    </>
  )
}

export default App