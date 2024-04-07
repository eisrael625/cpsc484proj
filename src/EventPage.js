import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventCat.css";
import data from "./data.store";

export default function EventCat({ currentCategory, setCurrentCategory }) {
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

  return (
    <>
      <Header
        instructions={`Current category is ${data.currentData.category}. Pick an event to learn more about it!`}
      />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            {filteredEventData.map((event, index) => (
              index % 2 === 0 && ( // Render a new row for every two events
                <div className="row" key={index}>
                  <div className="column">
                    <h1>{event.EventName}</h1>
                    <p>{event.Description}</p>
                    <p>{event.Date} at {event.Time} in {event.Location} </p>
                  </div>
                  {filteredEventData[index + 1] && (
                    <div className="column">
                      <h1>{filteredEventData[index + 1].EventName}</h1>
                      <p>{filteredEventData[index + 1].Description}</p>
                      <p>{filteredEventData[index + 1].Date} at {filteredEventData[index + 1].Time} in {filteredEventData[index + 1].Location} </p>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      <Footer pageNumber={2} />
    </>
  );
}
