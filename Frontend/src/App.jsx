import React from 'react'
import ButtonAppBar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home page/Home'
import News from './components/News/News'
import Events from './components/Events/Events'
import ThingsToDo from './components/Things To Do/DoThings'
function App() {
  return (
    <>
    <ButtonAppBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/things' element={<ThingsToDo/>}/>
    </Routes>
    </>
  )
}

export default App