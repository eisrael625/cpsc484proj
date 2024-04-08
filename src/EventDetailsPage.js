import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventCat.css";
import data from "./data.store";

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
        instructions={`Current Event is ${data.currentData.eventName}. Feel free to browse other events by clicking back in the footer!`}
      />
      
                    <h1>{data.currentData.eventName}</h1>
                    <p>{data.currentData.eventDescription}</p>
                    <p>{data.currentData.eventDate} at {data.currentData.eventTime} in {data.currentData.eventLocation} </p>
                  
      <Footer pageNumber={3} />
    </>
  );
}
