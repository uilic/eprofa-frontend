import React from 'react';
import Navbar from './Nav/Navbar';
import Register from './accounts/Register'
import Login from './accounts/Login'
import TutorForm from './tutor/TutorForm'
import Home from './Home'
import Protected from './Protected'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import RequireAuth from './context/RequireAuth'

function App() {

  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prijava' element={<Login />} />
          <Route path='/registracija' element={<Register />} />
          <Route path="/protected" element={<RequireAuth><Protected /></RequireAuth>} />
          <Route path="/postani-tutor" element={<RequireAuth><TutorForm /></RequireAuth>} />
        </Routes>
    </div>
  );
}

export default App;
