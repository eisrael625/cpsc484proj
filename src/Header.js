import React from 'react';
import './Header.css';

export default function Header(props) {
    const { instructions } = props;

    return (
        <div className="Header">
            <p>Instructions: {instructions}</p>
        </div>
    );
}
