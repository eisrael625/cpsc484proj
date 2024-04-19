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

  // Handle function to simulate button clicks based on selectedOption
  useEffect(() => {
    if (selectedOption !== null) {
      const indexToClick = selectedOption - 1;
      if (categories[indexToClick]) {
        setCurrentCategory("bye");
        handleClick(categories[indexToClick]);
      } else if (selectedOption == 6) {
        window.location.href = "homePage";
      }
    }
  }, [selectedOption, categories, setCurrentCategory]);

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
