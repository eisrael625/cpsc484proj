import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HandPositionTracker from "./interface";
import "./EventCat.css";
import data from "./data.store";

export default function Calibration() {
  const [selectedOption, setSelectedOption] = useState(null);

  let filteredEventData = [
    { EventName: "TOP RIGHT" },
    { EventName: "TOP LEFT" },
    { EventName: "MID RIGHT" },
    { EventName: "MIDLEFT" },
  ];

  return (
    <>
      <Header instructions={`Move your hand to see the calibration`} />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            <div className="row">
              <div className="column" data-hover={selectedOption === 2}>
                <h1>{filteredEventData[0].EventName}</h1>
              </div>
              <div className="column" data-hover={selectedOption === 1}>
                <h1>{filteredEventData[1].EventName}</h1>
              </div>
            </div>
            <div className="row">
              <div className="column" data-hover={selectedOption === 4}>
                <h1>{filteredEventData[2].EventName}</h1>
              </div>
              <div className="column" data-hover={selectedOption === 3}>
                <h1>{filteredEventData[3].EventName}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer pageNumber={2} cal={1} />
    </>
  );
}