import React, { Component } from "react";
import data from "./data.store";

class HandPositionTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      cursorX: 0, // Initialize cursorX and cursorY
      cursorY: 0,
    };
  }

  componentDidMount() {
    this.startWebSocket();
  }

  startWebSocket() {
    var host = "cpsc484-03.stdusr.yale.internal:8888";
    var url = "ws://" + host + "/frames";
    this.socket = new WebSocket(url);
    this.socket.onmessage = this.processFrame;
  }

  processFrame = (event) => {
    const data = JSON.parse(event.data);
    if (data.people) {
      for (const person of data.people) {
        this.processPerson(person);
      }
    }
  };

  processPerson = (person) => {
    // Extract joint data
    const { joints } = person;
    const neck = joints[3];
    const handRight = joints[15];

    // Calculate cursor position based on hand position and screen dimensions
    const cursorX = ((handRight.position.x + 1) * window.innerWidth) / 2;
    const cursorY = ((handRight.position.y + 1) * window.innerHeight) / 2;

    // Update selected option based on hand position
    const selectedOption = this.checkPosition(neck, handRight);
    this.setState({ selectedOption, cursorX, cursorY });

    // Call the function passed from parent component
    this.props.setSelectedOption(selectedOption);
  };

  checkPosition = (neck, handRight) => {
    const threshold = 0; // The minimum distance the hand needs to be above the neck
    if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(1);
      return 1;
    } else if (
      handRight.position.y >= neck.position.y + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(2);
      return 2;
    }
    return null; // Return null if no option is selected
  };

  render() {
    const { cursorX, cursorY } = this.state; // Access cursorX and cursorY from state

    // Render UI based on the cursor position
    return (
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          cursor: "pointer",
        }}
      >
        <div className="cursor">•</div>
      </div>
    );
  }
}

export default HandPositionTracker;
