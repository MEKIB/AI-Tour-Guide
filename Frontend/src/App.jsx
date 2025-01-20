import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import HomeCarousel from './components/Home page/Home'
function App() {
  return (
    <>
     <Navbar/>
     <HomeCarousel/>
     <Footer/>
    </>
  )
}

export default App