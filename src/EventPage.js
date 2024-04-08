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

  const handleClick = (name, date, location, time, description) => {
    window.location.href = "eventDetails";
    data.setEventName(name);
    data.setEventDate(date);
    data.setEventLocation(location);
    data.setEventTime(time);
    data.setEventDescription(description);
  console.log("Clicked category:", name);
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
                  <div className="column" onClick={() => handleClick(event.EventName, event.Date, event.Location, event.Time, event.Description)}>
                    <h1>{event.EventName}</h1>
                    <p>{event.Description}</p>
                    <p>{event.Date} at {event.Time} in {event.Location} </p>
                  </div>
                  {filteredEventData[index + 1] && (
                    <div className="column" onClick={() => handleClick(filteredEventData[index + 1].EventName, filteredEventData[index + 1].Date, filteredEventData[index + 1].Location, filteredEventData[index + 1].Time, filteredEventData[index + 1].Description)}>
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
