import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HandPositionTracker from "./interface";
import "./EventCat.css";
import data from "./data.store";

export default function Calibration() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const calibrationOptions = [
    { EventName: "TOP LEFT" },
    { EventName: "TOP RIGHT" },
    { EventName: "MID LEFT" },
    { EventName: "MID RIGHT" },
  ];

  // Reset countdown whenever selectedOption changes
  useEffect(() => {
    setCountdown(3); // Reset countdown to 3
  }, [selectedOption]);

  // Start the countdown when selectedOption changes and it's 75
  useEffect(() => {
    if (selectedOption === 5) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      // Clear the interval when the component unmounts or when selectedOption changes
      return () => clearInterval(intervalId);
    }
  }, [selectedOption]);

  return (
    <>
      <Header instructions={`Move your hand to see the calibration`} />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            <div className="row">
              <div className="column" data-hover={selectedOption === 2}>
                <h1>{calibrationOptions[0].EventName}</h1>
              </div>
              <div className="column" data-hover={selectedOption === 1}>
                <h1>{calibrationOptions[1].EventName}</h1>
              </div>
            </div>
            <div className="row">
              <div className="column" data-hover={selectedOption === 4}>
                <h1>{calibrationOptions[2].EventName}</h1>
              </div>
              <div className="column" data-hover={selectedOption === 3}>
                <h1>{calibrationOptions[3].EventName}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Circle with timer */}
      <div className="circle-container">
        <div className="circle">
          <p className="timer">{countdown}</p>
        </div>
      </div>
      <Footer pageNumber={2} cal={1} />
    </>
  );
}
