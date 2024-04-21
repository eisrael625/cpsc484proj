import React, { Component } from "react";
import data from "./data.store";

class HandPositionTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
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
    const spine_chest = joints[2];
    const spine_navel = joints[1];
    const shoulderRight = joints[12];
    const shoulderLeft = joints[5];
    const handRight = joints[15];
     // Calculate cursor position based on hand position and screen dimensions
     const cursorX = (handRight.position.x + 1) * window.innerWidth / 2;
     const cursorY = (handRight.position.y + 1) * window.innerHeight / 2;

    // Update selected option based on hand position
    const selectedOption = this.checkPosition(
      neck,
      spine_chest,
      spine_navel,
      shoulderRight,
      shoulderLeft,
      handRight,
    );
    this.setState({ selectedOption });
    this.props.setSelectedOption(selectedOption); // Call the function passed from parent component
  };
//UP IS NEGATIVE AND RIGHT IS NEGATIVE 
  checkPosition = (
    neck,
    spine_chest,
    spine_navel,
    shoulderRight,
    shoulderLeft,
    handRight,
  ) => {
    const threshold = 0; // The minimum distance the hand needs to be above the shoulder
    console.log("neckX: %d, necky: %d handRightx: %d handrighty: %d", neck.position.x, neck.position.y, handRight.position.x, handRight.position.y);
    if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
      
    ) {
      console.log(1);
      data.setHandLocation(1);
      return 1;
    } else if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.position.x > shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(2);
      console.log(2);
      return 2;
    }
     else if (
      handRight.position.y >= neck.position.y + threshold &&
      handRight.position.y <= spine_chest.position.y - threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(3);
      console.log(3);
      return 3;
    } else if (
      handRight.position.y >= neck.position.y + threshold &&
      handRight.position.y <= spine_chest.position.y - threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(4);
      console.log(4);
      return 4;
    } else if (
      handRight.position.y >= spine_chest.position.y + threshold &&
      // handRight.position.y <= spine_navel.position.y - threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(7);
      console.log(5);
      return 7;
    } else if (
      handRight.position.y >= spine_chest.position.y + threshold &&
      // handRight.position.y <= spine_navel.position.y - threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.position.x <= shoulderLeft.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(6);
      console.log(6);
      return 6;
    } else if (
      handRight.position.y >= spine_chest.position.y + threshold &&
      // handRight.position.y <= spine_navel.position.y - threshold &&
      handRight.position.x >= shoulderLeft.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(5);
      console.log(7);
      return 5;
    }
    return null; // Return null if no option is selected
  };

  render() {
    const { cursorX, cursorY } = this.state; // Access cursorX and cursorY from state

    // Render UI based on the cursor position
    return (
      <div style={{ position: "absolute", left: cursorX, top: cursorY, cursor: "pointer" }}>
        <div className="cursor">•</div>
      </div>
    );
  }
}

export default HandPositionTracker;
