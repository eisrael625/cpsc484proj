import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventDetailsPage.css";
import HandPositionTracker from "./interface"; // Import HandPositionTracker component
import data from "./data.store";
import QRCode from "react-qr-code";
export default function EventDetailsPage({
  currentCategory,
  setCurrentCategory,
}) {
  const [eventData, setEventData] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option from HandPositionTracker

  useEffect(() => {
    fetchEventDataAndUpdateState();
  }, []);

  useEffect(() => {
    filterEventData(data.currentData.category);
  }, [eventData]);

  useEffect(() => {
    if (selectedOption !== null) {
      // Logic to determine which buttons to click based on selectedOption
      if (selectedOption == 5) {
        window.location.href = "/";
      } else if (selectedOption == 6) {
        window.location.href = "eventCat";
      } else if (selectedOption == 7) {
        window.location.href = "events";
      }
    }
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
                <p className="qrTitle">Add Event to Google Calender</p>

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

      <Footer pageNumber={3} />
    </>
  );
}
