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
  const [idleCount, setIdleCountdown] = useState(10);

  useEffect(() => {
    fetchEventDataAndUpdateState();
  }, []);

  useEffect(() => {
    filterEventData(data.currentData.category);
  }, [eventData]);

  useEffect(() => {
    if (selectedOption !== null) {
      // Logic to determine which buttons to click based on selectedOption
      const indexToClick = selectedOption - 1;
      if (filteredEventData[indexToClick]) {
        handleClick(filteredEventData[indexToClick]);
      } else if (selectedOption == 5) {
        window.location.href = "/";
      } else if (selectedOption == 7) {
        window.location.href = "eventCat";
      }
    }
  }, [selectedOption, filteredEventData]);
  

  useEffect(() => {
    if (selectedOption === 7) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      // useEffect(() => {
      //   if (countdown === 0) {
      //     handleClick("/");
      //   }
      // }, [countdown]);

      // Clear the interval when the component unmounts or when selectedOption changes
      return () => clearInterval(intervalId);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption === null) {
      const intervalId = setInterval(() => {
        setIdleCountdown((prevCountdown) => {
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

      useEffect(() => {
        if (idleCount === 0) {
          handleClick("/");
        }
      }, [idleCount]);


  

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
    console.log("Clicked category:", event.EventName);
  };

  return (
    <>
      <Header
        instructions={`Current category is ${data.currentData.category}. Pick an event to learn more about it!`}
      />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            {filteredEventData.map(
              (event, index) =>
                index % 2 === 0 && ( // Render a new row for every two events
                  <div className="row" key={index}>
                    <div className="column" onClick={() => handleClick(event)}>
                      <h1 className="catHeader">{event.Category}</h1>
                      <h1>{event.EventName}</h1>
                      <p>{event.Description}</p>
                      <p>
                        {event.Date} at {event.Time} in {event.Location}{" "}
                      </p>
                    </div>
                    {filteredEventData[index + 1] && (
                      <div
                        className="column"
                        onClick={() =>
                          handleClick(filteredEventData[index + 1])
                        }
                      >
                        <h1>{filteredEventData[index + 1].Category}</h1>
                        <h1>{filteredEventData[index + 1].EventName}</h1>
                        <p>{filteredEventData[index + 1].Description}</p>
                        <p>
                          {filteredEventData[index + 1].Date} at{" "}
                          {filteredEventData[index + 1].Time} in{" "}
                          {filteredEventData[index + 1].Location}{" "}
                        </p>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <Footer pageNumber={2} />
    </>
  );
}
