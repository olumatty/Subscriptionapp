import React from 'react'
import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Subscription from './Subscription/Subscription';
import PlatformManager from './Platform/PlatformManager';

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Login/>}/>
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/subscription' exact element={<Subscription/>}/>
      <Route path = "/platform" exact element = {<PlatformManager/>}/>
      <Route path='/dashbaoard' exact element={<Home/>}/>
    </Routes>
  </Router>
)

function App() {

  return (
    <div>
      {routes}
    </div>
  )
}

export default App
