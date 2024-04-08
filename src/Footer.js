import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Footer.css'
export default function Footer({ pageNumber }) {
    const handleClick = (href) => {
        // You can perform any actions here before navigating to the new page
        window.location.href = href;
    };
    return (
      <div className='Footer'>
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
      </div>
    );
}
