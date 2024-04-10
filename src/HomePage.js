import React, { useState } from "react";
import HandPositionTracker from "./interface";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle function to simulate clicking on the container based on selectedOption
  const handleClick = (href) => {
    // You can perform any actions here before navigating to the new page
    window.location.href = href;
  };

  // Check if the selectedOption is 1, 2, or 3 and simulate click accordingly
  if (selectedOption === 1 || selectedOption === 2 || selectedOption === 3) { //If hand is lifted
    handleClick("/eventCat");
  }

  return (
    <>
      <Header instructions="Raise Right hand (/Click) to go to the next page" />
      <HandPositionTracker setSelectedOption={setSelectedOption} /> {/* Pass setSelectedOption as props */}
      <div className="home">
        <div className="container" onClick={() => handleClick("/eventCat")}>
          <h1 className="text">Welcome to Event Finder</h1>
          <h2 className="text">Raise your right hand (Click anywhere) to start</h2>
        </div>
      </div>
    </>
  );
};

export default HomePage;
