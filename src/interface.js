// Import dependencies and set up state variables

var host = "cpsc484-03.stdusr.yale.internal:8888";

$(document).ready(function () {
  frames.start();
});

var frames = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      var command = frames.get_left_wrist_command(JSON.parse(event.data));
      if (command !== null) {
        sendWristCommand(command);
      }
    };
  },

  get_left_wrist_command: function (frame) {
    var command = null;
    if (frame.people.length < 1) {
      return command;
    }

    // Normalize by subtracting the root (pelvis) joint coordinates
    var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;
    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

    if (left_wrist_x < 200 && left_wrist_x > -200) {
      if (left_wrist_y > 500) {
        command = 73; // UP !!update to match our interface!!
      } else if (left_wrist_y < 100) {
        command = 75; // DOWN !!Update to match our interface!!
      }
    } else if (left_wrist_y < 500 && left_wrist_y > 100) {
      if (left_wrist_x > 200) {
        command = 76; // RIGHT !!Update to match our interface!!
      } else if (left_wrist_x < -200) {
        command = 74; // LEFT !!Update to match our interface!!
      }
    }
    return command;
  },
};

var twod = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/twod";
    twod.socket = new WebSocket(url);
    twod.socket.onmessage = function (event) {
      twod.show(JSON.parse(event.data));
    };
  },

  show: function (twod) {
    $(".twod").attr("src", "data:image/pnjpegg;base64," + twod.src);
  },
};

// Establish WebSocket connections for motion capture frames

// Modify or create a function to extract left wrist position from motion capture frames
function getLeftWristPosition(frame) {
  // Extract left wrist position from the frame data
  // Return the position (e.g., an object with x and y coordinates)
}

// Inside the WebSocket onmessage event handler for motion capture frames
frames.socket.onmessage = function (event) {
  // Extract left wrist position from the received frame data
  const wristPosition = getLeftWristPosition(JSON.parse(event.data));

  // Map wrist position to button selection
  const selectedButton = mapWristToButton(wristPosition);

  // Trigger button selection action
  if (selectedButton) {
    handleButtonSelection(selectedButton);
  }
};

// Define a function to map wrist position to button selection
function mapWristToButton(wristPosition) {
  // Determine which button the wrist is positioned over
  // Return the corresponding button (e.g., category name)
}

// Define a function to handle button selection
function handleButtonSelection(selectedButton) {
  // Perform actions based on the selected button (e.g., update current category state)
  setCurrentCategory(selectedButton);
}

// Update handleClick function to avoid click events and use WebSocket data instead
const handleClick = (category) => {
  window.location.href = "events";
  data.setCategory(category);
  console.log("Clicked category:", category);
};

// Modify the interface rendering logic if needed to reflect the new selection method
