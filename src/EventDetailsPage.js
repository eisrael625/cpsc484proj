import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventDetailsPage.css";
import HandPositionTracker from "./interface"; // Import HandPositionTracker component
import data from "./data.store";
import QRCode from "react-qr-code";

export default function EventDetailsPage({ currentCategory, setCurrentCategory }) {
  const [eventData, setEventData] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option from HandPositionTracker
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
    if ((selectedOption == 5) || (selectedOption == 6) || (selectedOption == 7)) {
      setCountdown(3);
      clearInterval(intervalId);
      // Logic to determine which buttons to click based on selectedOption
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            if (selectedOption == 7) {
              window.location.href = "/";
            } else if (selectedOption == 6) {
              window.location.href = "eventCat";
            } else if (selectedOption == 5) {
              window.location.href = "events";
            }
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [selectedOption]);

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

  return (
    <>
      <Header
        instructions={`Current Event is ${data.currentData.eventName}. Feel free to browse other events by clicking back down below!`}
      />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="eventPageDiv">
        <div className="eventBodyDiv">
          <h1 className="eventTitle"> {data.currentData.category} Event</h1>
          <h1 className="eventTitle"> {data.currentData.eventName}</h1>
  
          <div className="eventBody">
            <div className="eventLeft">
              <p>Event Description: {data.currentData.eventDescription}</p>
              <p>
                Event Details: {data.currentData.eventDate} at{" "}
                {data.currentData.eventTime} in {data.currentData.eventLocation}{" "}
              </p>
            </div>
            <div className="eventRight">
              <div className="qrcodeDiv">
                <p className="qrTitle">Add Event to Google Calendar</p>
  
                <QRCode
                  className="qr"
                  style={{ height: "200" }}
                  value={data.currentData.eventCalURL}
                />
              </div>
  
              <div className="qrcodeDiv">
                <p className="qrTitle">
                  Join {data.currentData.category} List Serve
                </p>
  
                <QRCode
                  className="qr"
                  style={{ height: "200" }}
                  value={data.currentData.listServeURL}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="countdown-container">
        <div className="countdown">
          <p className="timer">{countdown}</p>
        </div>
      </div>
      <Footer pageNumber={3} />
    </>
  );
}  

