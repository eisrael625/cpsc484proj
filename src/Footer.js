import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HandPositionTracker from "./interface";
import './Footer.css'
export default function Footer({ pageNumber, cal }) {
    const handleClick = (href) => {
        // You can perform any actions here before navigating to the new page
        window.location.href = href;
    };
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        if (selectedOption !== null) {
         if (selectedOption == 7 && cal) {
          //  window.location.href = "eventCat";
          }
        }
      }, [selectedOption]);

    return (
        <div className='Footer'>

            {cal ? (
              <>
                  <div className="button" data-hover={selectedOption === 5}>
                      <p>   5   </p>
                  </div>
                    <div className="button" data-hover={selectedOption === 6}>
                      <p>   6   </p>
                  </div>
                  <div className="button" data-hover={selectedOption === 7}>
                      <p>   Go here to continue to next page   </p>
                  </div>
              </>
          ) : (
              <>
                  {pageNumber === 1 && (
                      <div className="button" onClick={() => handleClick('/')}>
                          <p> Back to Home</p>
                      </div>
                  )}
                  {pageNumber === 2 && (
                      <>
                          <div className="button" onClick={() => handleClick('/')}>
                              <p> Back to Home</p>
                          </div>
                          <div className="button" onClick={() => handleClick('eventCat')}>
                              <p> Pick New Category</p>
                          </div>
                      </>
                  )}
                  {pageNumber === 3 && (
                      <>
                          <div className="button" onClick={() => handleClick('/')}>
                              <p> Back to Home</p>
                          </div>
                          <div className="button" onClick={() => handleClick('eventCat')}>
                              <p> Pick New Category</p>
                          </div>
                          <div className="button" onClick={() => handleClick('events')}>
                              <p> Pick New Event</p>
                          </div>
                      </>
                  )}
              </>
            )}
            <HandPositionTracker setSelectedOption={setSelectedOption} />
        </div>
      );
  }