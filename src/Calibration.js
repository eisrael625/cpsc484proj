import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HandPositionTracker from "./interface";
import "./EventCat.css";
import data from "./data.store";

export default function Calibration() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const calibrationOptions = [
    { EventName: "TOP RIGHT" },
    { EventName: "TOP LEFT" },
    { EventName: "MID RIGHT" },
    { EventName: "MIDLEFT" },
  ];

  useEffect(() => {
    // Start the countdown when selectedOption changes
    if (selectedOption !== null) {
      // Clear the previous interval if it exists
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId); // Stop the countdown when it reaches 0
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
              {calibrationOptions.map((option, index) => (
                <div
                  key={index}
                  className="column"
                  data-hover={selectedOption === index + 1}
                >
                  <h1>{option.EventName}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="countdown">Countdown: {countdown}</div>
      <Footer pageNumber={2} cal={1} />
    </>
  );
}
