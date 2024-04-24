import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import HandPositionTracker from "./interface";
import "./EventCat.css";
import data from "./data.store";

export default function EventCat({ currentCategory, setCurrentCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [countdown, setCountdown] = useState(3);
  let intervalId;

  const handleClick = (category) => {
    window.location.href = "events";
    data.setCategory(category);
    console.log("Clicked category:", category);
  };

  useEffect(() => {
    setCountdown(3); // Reset countdown to 3
  }, [selectedOption]);

  useEffect(() => {
    fetchCategories();
    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  useEffect(() => {
   if (selectedOption !== null) {
      console.log("Quadrant:", selectedOption);
      setCountdown(3);
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            handleClick(categories[selectedOption - 1]); // Pass the category corresponding to the selected option
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clear interval when selectedOption changes
  }, [selectedOption, categories]);

  const fetchCategories = async () => {
    const eventData = await fetchEventData();
    const uniqueCategories = [...new Set(eventData.map((row) => row.Category))];
    setCategories(uniqueCategories);
  };

  return (
    <>
      <Header instructions="Select A Category to see more events" />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            <div className="row">
              <div className="column" data-hover={selectedOption === 2}>
                <h1>{categories[0]}</h1>
              </div>
              <div className="column" data-hover={selectedOption === 1}>
                <h1>{categories[1]}</h1>
              </div>
            </div>
            <div className="row">
              <div className="column" data-hover={selectedOption === 4}>
                <h1>{categories[2]}</h1>
              </div>
              <div className="column" data-hover={selectedOption === 3}>
                <h1>{categories[3]}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="circle-container">
        <div className="circle">
          <p className="timer">{countdown}</p>
        </div>
      </div>
      <Footer pageNumber={1}/>
    </>
  );
}