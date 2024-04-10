import { useEffect, useState } from "react";
import { fetchEventData } from "./GoogleSheets";
import Header from "./Header";
import Footer from "./Footer";
import "./EventCat.css";
import data from "./data.store"

export default function EventCat({currentCategory, setCurrentCategory}) {
  const [categories, setCategories] = useState([]);

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

  return (
    <>
      <Header instructions="Select A Category to see more events" />
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
                                    onClick={() => { setCurrentCategory("bye"); handleClick(categories[index + 1]) }}
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
