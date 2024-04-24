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
    var host = "cpsc484-04.stdusr.yale.internal:8888";
    var url = "ws://" + host + "/frames"; // Use wss:// for secure WebSocket connection
    this.socket = new WebSocket(url);
    this.socket.onmessage = this.processFrame;
  }

  processFrame = (event) => {
    console.log("here");
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
    const pelvis = joints[0];
    const shoulderRight = joints[12];
    const shoulderLeft = joints[5];
    const handRight = joints[15];

    // Calculate cursor position based on hand position and navel joint position
    const cursorX =
      ((handRight.position.x - pelvis.position.x + 1) * window.innerWidth) / 2;
    const cursorY =
      ((handRight.position.y - pelvis.position.y + 1) * window.innerHeight) / 2;

    // Update selected option based on hand position
    const selectedOption = this.checkPosition(
      neck,
      spine_chest,
      pelvis,
      shoulderRight,
      shoulderLeft,
      handRight,
    );
    this.setState({ selectedOption, cursorX, cursorY });

    // Call the function passed from parent component
    this.props.setSelectedOption(selectedOption);

    // Start the countdown when a valid option is selected
    if (selectedOption !== null) {
      this.startCountdown();
    }
  };

  checkPosition = (
    neck,
    spine_chest,
    pelvis,
    shoulderRight,
    shoulderLeft,
    handRight,
  ) => {
    const threshold = 0; // The minimum distance the hand needs to be above the navel
    if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(1);
      return 1;
    } else if (
      handRight.position.y <= neck.position.y - threshold &&
      handRight.position.x > shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(2);
      return 2;
    } else if (
      handRight.position.y <= pelvis.position.y + threshold &&
      handRight.position.y >= spine_chest.position.y - threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(3);
      return 3;
    } else if (
      handRight.position.y <= pelvis.position.y + threshold &&
      handRight.position.y >= spine_chest.position.y - threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(4);
      return 4;
    } else if (
      handRight.position.y >= pelvis.position.y + threshold &&
      // handRight.position.y <= spine_navel.position.y - threshold &&
      handRight.position.x <= shoulderRight.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(7);
      return 7;
    } else if (
      handRight.position.y >= pelvis.position.y + threshold &&
      // handRight.position.y <= spine_navel.position.y - threshold &&
      handRight.position.x >= shoulderRight.position.x + threshold &&
      handRight.position.x <= shoulderLeft.position.x - threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(6);
      return 6;
    } else if (
      handRight.position.y >= pelvis.position.y + threshold &&
      // handRight.position.y <= spine_navel.position.y - threshold &&
      handRight.position.x >= shoulderLeft.position.x + threshold &&
      handRight.confidence >= 2
    ) {
      data.setHandLocation(5);
      return 5;
    }
    return null; // Return null if no option is selected
  };

  startCountdown() {
    this.setState({ countdown: 3 }); // Reset the countdown to 3
    this.countdownInterval = setInterval(() => {
      this.setState(
        (prevState) => ({
          countdown: prevState.countdown - 1, // Decrement countdown every second
        }),
        () => {
          // Stop the countdown when it reaches 0
          if (this.state.countdown === 0) {
            clearInterval(this.countdownInterval);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval); // Clear the interval when the component unmounts
  }

  render() {
    const { cursorX, cursorY } = this.state; // Access cursorX and cursorY from state

    // Render UI based on the cursor position
    return <></>;
  }
}

export default HandPositionTracker;
