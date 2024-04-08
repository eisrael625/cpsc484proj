import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './HomePage.js'
import EventCategoryPage from './EventCat.js'
import EventsPage from './EventPage.js'
import EventDetailsPage from './EventDetailsPage';
import { useEffect, useState } from "react";


function App() {
  const [currentCategory, setCurrentCategory] = useState([]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventCat" element={<EventCategoryPage currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />} />
          <Route path="/events" element={<EventsPage currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />} />
          <Route path="/eventDetails" element={<EventDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
