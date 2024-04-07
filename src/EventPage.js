import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventCat.css";
import data from "./data.store";

export default function EventCat({ currentCategory, setCurrentCategory }) {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetchEventDataAndUpdateState();
  }, []);

  useEffect(() => {
    filterEventData(data.currentData.category);
    console.log(data.currentData.category, "cat");
  }, [data.currentData.category]);

  const fetchEventDataAndUpdateState = async () => {
    const eventData = await fetchEventData();
    setEventData(eventData);
    
  };

  const filterEventData = (category) => {
    console.log("event event data", eventData);
    console.log("rvrvr");
    const filteredEvents = eventData.filter(
      (event) => event.Category === category,
    );
    console.log(filteredEvents);
    const eventNames = filteredEvents.map((event) => event.EventName);
    setFilteredEventData(eventNames.slice(0, 4));
    console.log("Filtered Event Data:", eventNames.slice(0, 4));
  };

  const [filteredEventData, setFilteredEventData] = useState([]);

  return (
    <>
      <Header
        instructions={`Current Category is ${data.currentData.category}. Select A Event to see the events`}
      />
      <div className="scrollable">
        <div className="EventCat">
          {filteredEventData.map((event, index) => (
            <div className="row" key={index}>
              <div className="column">
                <h1>{event.EventName}</h1>
                <p>{event.EventDetails}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={2} />
    </>
  );
}
