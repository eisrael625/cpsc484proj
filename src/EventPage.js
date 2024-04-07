import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventCat.css";
import data from "./data.store"

export default function EventCat({currentCategory, setCurrentCategory}) {
  const [categories, setCategories] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);
  const currentCategory = "Math";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      filterEventData(currentCategory);
    }
  }, [currentCategory]);

  const fetchCategories = async () => {
    const eventData = await fetchEventData();
    const uniqueCategories = [
      ...new Set(eventData.map((row) => row.EventName)),
    ];
    setCategories(uniqueCategories);
  };

  const filterEventData = (category) => {
    const eventData = categories.filter((row) => row.Category === category);
    setFilteredEventData(eventData.slice(0, 4));

    console.log("Filtered Event Data:", eventData.slice(0, 4));
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
