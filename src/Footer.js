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
                    <button><Link to="/" className="link">Back to Home</Link></button>
                    <button><Link to="/eventCat" className="link">Pick New Category</Link></button>
                </>
            )}
            {pageNumber === 3 && (
                <>
                    <button><Link to="/" className="link">Back to Home</Link></button>
                    <button><Link to="/eventCat" className="link">Pick New Category</Link></button>
                    <button><Link to="/pickEvent" className="link">Pick New Event</Link></button>
                </>
            )}
      </div>
    );
}
