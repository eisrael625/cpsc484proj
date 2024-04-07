import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventCat.css";
import data from "./data.store"

export default function EventCat({currentCategory, setCurrentCategory}) {
  let categories = [];
  const [filteredEventData, setFilteredEventData] = useState([]);


  useEffect(() => {
    fetchCategories();
    console.log("Event Data:", eventData);
  }, []);

  useEffect(() => {
    if (data.currentData.category) {
      filterEventData(data.currentData.category);
    }
  }, [data]);

  const fetchCategories = async () => {
    const eventData = await fetchEventData();
    categories = eventData;
    console.log("Event Data:", eventData);
  };

  const filterEventData = (category) => {
    // Filter eventData based on the specified category
    console.log("Categories:", categories);
    const filteredEvents = categories.filter(row => row.Category === category);

    console.log("Filtered Categories:", filteredEvents);
    // Extract EventName objects from filtered events
    const eventNames = filteredEvents.map((event) => event.EventName);

    // Set the filtered event names in state
    categories = eventNames.slice(0, 4);

    console.log("Filtered Event Names:", eventNames.slice(0, 4));
  };

  return (
    <>
      <Header instructions={`Current Category is ${data.currentData.category}. Select A Event to see the events`} />
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
