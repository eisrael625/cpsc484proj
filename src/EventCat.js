import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import HandPositionTracker from "./interface"; // Import HandPositionTracker component
import "./EventCat.css";
import data from "./data.store";

export default function EventCat({ currentCategory, setCurrentCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option from HandPositionTracker
  // const [delayedClick, setDelayedClick] = useState(null);
  const [countdown, setCountdown] = useState(3); // Initialize countdown at 3 for consistency

  // Define the handleClick function
  const handleClick = (category) => {
    // if (countdown === 0) {
    window.location.href = "events";
    data.setCategory(category);
    console.log("Clicked category:", category);
    // }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const eventData = await fetchEventData();
    const uniqueCategories = [...new Set(eventData.map((row) => row.Category))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    if (selectedOption !== null) {
      // Clear the previous timeout if it exists
      setCountdown(3);
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            handleClick(selectedOption);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

      return () => clearInterval(intervalId);
    }
  }, [selectedOption]);

  return (
    <>
      <Header instructions="Select A Category to see more events" />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            {categories.map((category, index) => {
              const isHovered = selectedOption === index;
              return (
                <div className="row" key={index}>
                  <div
                    className={`column ${isHovered ? "selected" : ""}`}
                    data-hover={isHovered}>
                    <h1>{category}</h1>
                  </div>
                  {categories[index + 1] && (
                    <div
                      className={`column ${
                        selectedOption === index + 1 ? "selected" : ""
                      }`}
                      data-hover={selectedOption === index + 1}>
                      <h1>{categories[index + 1]}</h1>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="circle-container">
        <div className="circle">
          <p className="timer">{countdown}</p>
        </div>
      </div>
      <Footer pageNumber={3} />
    </>
  );
  