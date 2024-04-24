import React, { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import HandPositionTracker from "./interface";
import "./EventCat.css";
import data from "./data.store";

export default function EventCat({ currentCategory, setCurrentCategory }) {
  const [eventData, setEventData] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [countdown, setCountdown] = useState(3); // Countdown state
  let intervalId;

  useEffect(() => {
    setCountdown(3); // Reset countdown to 3
  }, [selectedOption]);

  useEffect(() => {
    fetchEventDataAndUpdateState();
  }, []);

  useEffect(() => {
    filterEventData(data.currentData.category);
  }, [eventData]);

  useEffect(() => {
    if (selectedOption !== null) {
      setCountdown(3);
      // Clear previous intervals (if any)
      clearInterval(intervalId);
      // Set up a new interval
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            if (selectedOption == 5){
              window.location.href = "/";
            }
            else if (selectedOption == 7) {
              window.location.href = "eventCat";
            }
            else {
              handleClick(filteredEventData[selectedOption - 1] || {});
            }
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [selectedOption, filteredEventData]);

  const fetchEventDataAndUpdateState = async () => {
    const eventData = await fetchEventData();
    setEventData(eventData);
    filterEventData(data.currentData.category);
  };

  const filterEventData = (category) => {
    const filteredEvents = eventData.filter(
      (event) => event.Category === category,
    );
    setFilteredEventData(filteredEvents.slice(0, 4));
  };

  const handleClick = (event) => {
    window.location.href = "eventDetails";
    data.setEventName(event.EventName);
    data.setEventDate(event.Date);
    data.setEventLocation(event.Location);
    data.setEventTime(event.Time);
    data.setEventDescription(event.Description);
    data.setEventCalURL(event.CalLink);
    data.setListServeURL(event.ListServeLink);
    console.log("Clicked event:", event.EventName);
  };

  return (
    <>
      <Header
        instructions={`Current category is ${data.currentData.category}. Pick an event to learn more about it!`}
      />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventDetails">
          <div className="topics">
            <div className="row">
              <div
                className="column"
                data-hover={selectedOption === 2}
                onClick={() => handleClick(filteredEventData[0])}
              >
                <h1 className="catHeader">{filteredEventData[0].Category}</h1>
                <h1>{filteredEventData[0].EventName}</h1>
                <p>{filteredEventData[0].Description}</p>
                <p>
                  {filteredEventData[0].Date} at {filteredEventData[0].Time} in{" "}
                  {filteredEventData[0].Location}{" "}
                </p>
              </div>
              <div
                className="column"
                data-hover={selectedOption === 1}
                onClick={() => handleClick(filteredEventData[1])}
              >
                <h1 className="catHeader">{filteredEventData[1].Category}</h1>
                <h1>{filteredEventData[1].EventName}</h1>
                <p>{filteredEventData[1].Description}</p>
                <p>
                  {filteredEventData[1].Date} at {filteredEventData[1].Time} in{" "}
                  {filteredEventData[1].Location}{" "}
                </p>
              </div>
            </div>
            <div className="row">
              <div
                className="column"
                data-hover={selectedOption === 4}
                onClick={() => handleClick(filteredEventData[2])}
              >
                <h1 className="catHeader">{filteredEventData[2].Category}</h1>
                <h1>{filteredEventData[2].EventName}</h1>
                <p>{filteredEventData[2].Description}</p>
                <p>
                  {filteredEventData[2].Date} at {filteredEventData[2].Time} in{" "}
                  {filteredEventData[2].Location}{" "}
                </p>
              </div>
              <div
                className="column"
                data-hover={selectedOption === 3}
                onClick={() => handleClick(filteredEventData[3])}
              >
                <h1 className="catHeader">{filteredEventData[3].Category}</h1>
                <h1>{filteredEventData[3].EventName}</h1>
                <p>{filteredEventData[3].Description}</p>
                <p>
                  {filteredEventData[3].Date} at {filteredEventData[3].Time} in{" "}
                  {filteredEventData[3].Location}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="circle-container">
        <div className="circle">
          <p className="timer">{countdown}</p>
        </div>
      </div>
      <Footer pageNumber={2} />
    </>
  );
}