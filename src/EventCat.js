
import './EventCat.css'
import Header from './Header.js'
import Footer from './Footer.js'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const handleClick = (href) => {
    // You can perform any actions here before navigating to the new page
    window.location.href = href;
};
export default function EventCat() {
    return (
        <>
<Header instructions="Select A Category to see more events"/>
       <div className="EventCat">
        <div className="topics">
                <div className='row'>
                        <div className='column' onClick={() => handleClick('events')}>
                        <h1>Philosophy</h1>
                    </div>
                    <div className='column' onClick={() => handleClick('events')}>
                    <h1>Art</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='column' onClick={() => handleClick('events')}>
                    <h1>Music</h1>
                    </div>
                    <div className='column' onClick={() => handleClick('events')}>
                        <h1>Math</h1>
                    </div>
               </div>
            </div>
            
            </div>
            <Footer pageNumber={1}/>
        </>
    );
  }