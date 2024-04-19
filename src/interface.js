import React, { Component } from "react";

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
    const {
      neck,
      spine_chest,
      spine_navel,
      shoulderRight,
      shoulderLeft,
      handRight,
    } = joints;

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

  checkPosition = (
    neck,
    spine_chest,
    spine_navel,
    shoulderRight,
    shoulderLeft,
    handRight,
  ) => {
    const threshold = 50; // The minimum distance the hand needs to be above the shoulder

    if (
      handRight.position.y >= neck.position.y + threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      return 1;
    } else if (
      handRight.position.y >= neck.position.y + threshold &&
      handRight.position.x < shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      return 2;
    } else if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.position.y >= spine_chest.position.y + threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      return 3;
    } else if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.position.y >= spine_chest.position.y + threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      return 4;
    } else if (
      handRight.position.y <= spine_chest.position.y - threshold &&
      handRight.position.y >= spine_navel.position.y + threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      return 5;
    } else if (
      handRight.position.y <= spine_chest.position.y - threshold &&
      handRight.position.y >= spine_navel.position.y + threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.position.x >= shoulderLeft.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      return 6;
    } else if (
      handRight.position.y <= spine_chest.position.y - threshold &&
      handRight.position.y >= spine_navel.position.y + threshold &&
      handRight.position.x <= shoulderLeft.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      return 7;
    }
    return null; // Return null if no option is selected
  };

  render() {
    // Render UI based on the selected option if needed
    return <div></div>;
  }
}

export default HandPositionTracker;
