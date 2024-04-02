
import './HomePage.css'
import Header from './Header.js'
import Footer from './Footer.js'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const handleClick = (href) => {
    // You can perform any actions here before navigating to the new page
    window.location.href = href;
};
export default function HomePage() {
    return (
        <>
            <Header instructions="Click anywhere to go to the next page"/>
       <div className="home">
       
       <div className="container" onClick={() => handleClick('/eventCat')}>
                <h1>Welcome to Event Finder</h1>
                <h2>Click anywhere to start</h2>
        </div>
      </div>
        </>
       
    );
  }