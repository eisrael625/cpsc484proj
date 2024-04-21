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
  const [delayedClick, setDelayedClick] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const eventData = await fetchEventData();
    console.log(eventData);
    const uniqueCategories = [...new Set(eventData.map((row) => row.Category))];
    console.log(uniqueCategories);
    setCategories(uniqueCategories);
  };

  const handleClick = (category) => {
    window.location.href = "events";
    data.setCategory(category);
    console.log("Clicked category:", category);
  };

  useEffect(() => {
    if (selectedOption !== null) {
      // Clear the previous timeout if it exists
      if (delayedClick) {
        clearTimeout(delayedClick);
      }

      // Set a new timeout to trigger handleClick after 3 seconds
      const timeoutId = setTimeout(() => {
        const indexToClick = selectedOption - 1;
        if (categories[indexToClick]) {
          setCurrentCategory("bye");
          handleClick(categories[indexToClick]);
        } else if (selectedOption === 6) {
          window.location.href = "/";
        }
      }, 3000);

      // Store the timeout ID
      setDelayedClick(timeoutId);

      // Start the countdown
      setCountdown(3);

      // Update the countdown every second
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the interval when the component unmounts or when the selected option changes
      return () => clearInterval(intervalId);
    }
  }, [selectedOption, categories, setCurrentCategory, delayedClick]);

  return (
    <>
      <Header instructions="Select A Category to see more events" />
      <HandPositionTracker setSelectedOption={setSelectedOption} />
      <div className="scrollable">
        <div className="EventCat">
          <div className="topics">
            {categories.map(
              (category, index) =>
                index % 2 === 0 && (
                  <div className="row" key={index}>
                    <div
                      className="column"
                      onClick={() => handleClick(category)}
                    >
                      <h1>{category}</h1>
                    </div>
                    {categories[index + 1] && (
                      <div
                        className="column"
                        onClick={() => {
                          handleClick(categories[index + 1]);
                        }}
                      >
                        <h1>{categories[index + 1]}</h1>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <Footer pageNumber={1} />
    </>
  );
}
