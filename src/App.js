import React from 'react';
import axios from "axios";
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';

import Hyst from './pages/Hyst';
  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
    <Route exact path='/' exact element={<Home />} />

        
       
        <Route path='/Hyst' element={<Hyst/>} />
    </Routes>
    </Router>
);
}
  
export default App;