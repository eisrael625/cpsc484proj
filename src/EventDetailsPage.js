import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventDetailsPage.css";
import data from "./data.store";
import QRCode from "react-qr-code";
export default function EventDetailsPage() {
  const [eventData, setEventData] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);

  useEffect(() => {
    fetchEventDataAndUpdateState();
  }, []);

  useEffect(() => {
    filterEventData(data.currentData.category);
  }, [eventData]);

  const fetchEventDataAndUpdateState = async () => {
    const eventData = await fetchEventData();
    setEventData(eventData);
    filterEventData(data.currentData.category);
  };

  const filterEventData = (category) => {
    const filteredEvents = eventData.filter(
      (event) => event.Category === category
    );
    setFilteredEventData(filteredEvents.slice(0, 4));
  };

  const handleClick = (name, date, location, time) => {
    window.location.href = "eventDetails";
    data.setEventName(name);
    data.setEventDate(date);
    data.setEventLocation(location);
    data.setEventTime(time);
    console.log("Clicked category:", name);
  };

  return (
    <>
      <Header
        instructions={`Current Event is ${data.currentData.eventName}. Feel free to browse other events by clicking back down below!`}
      />
      <div className="eventPageDiv">
              <div className="eventBodyDiv">
                    <h1 className="eventTitle"> {data.currentData.category} Event</h1>
                  <h1 className="eventTitle"> {data.currentData.eventName}</h1>

          <div className="eventBody">
                      <div className="eventLeft">
              <p>Event Description: {data.currentData.eventDescription}</p>
              <p>Event Details: {data.currentData.eventDate} at{" "}
                {data.currentData.eventTime} in {data.currentData.eventLocation}{" "}
              </p>
            </div>
            <div className="eventRight">
              <div className="qrcodeDiv">
                <p className="qrTitle">Add Event to Google Calender</p>
                
                  <QRCode
                   className="qr"
                    style={{ height: "200"}}
                    value={data.currentData.eventCalURL}
                    // viewBox={`0 0 500 500`}
                  />
                              
                              </div>

                <div className="qrcodeDiv">
                              <p className="qrTitle">Join {data.currentData.category} List Serve</p>
                  
                    <QRCode
                      className="qr"
                      style={{ height: "200" }}
                      value={data.currentData.listServeURL}
                      // viewBox={`0 0 500 500`}
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
