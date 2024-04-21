import React, { useState, useEffect } from "react";
import HandPositionTracker from "./interface";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [countdown, setCountdown] = useState(3); // Initialize countdown state

  // Start the countdown when selectedOption changes
  useEffect(() => {
    if (selectedOption !== null && countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the interval when the component unmounts or when selectedOption changes
      return () => clearInterval(intervalId);
    }
  }, [selectedOption, countdown]); // Include countdown in the dependency array

  // Handle function to simulate clicking on the container based on selectedOption
  const handleClick = (href) => {
    // You can perform any actions here before navigating to the new page
    window.location.href = href;
  };

  // Check if the selectedOption is 1, 2, or 3 and simulate click accordingly
  if (selectedOption === 1 || selectedOption === 2 || selectedOption === 3) {
    //If hand is lifted
    handleClick("/eventCat");
  }

  return (
    <>
      <Header instructions="Raise Right hand (/Click) to go to the next page" />
      <HandPositionTracker setSelectedOption={setSelectedOption} />{" "}
      {/* Pass setSelectedOption as props */}
      <div className="home">
        <div className="container" onClick={() => handleClick("/eventCat")}>
          <h1 className="text">Welcome to Event Finder</h1>
          <h2 className="text">
            Raise your right hand (Click anywhere) to start
          </h2>
          {/* Display the countdown */}
          <p className="timer">{countdown}</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
