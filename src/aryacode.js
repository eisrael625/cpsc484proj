const LOCAL_DEV = true; // Set to false when running against the actual server

var host = "cpsc484-02.stdusr.yale.internal:8888";
if (LOCAL_DEV) {
	host = "127.0.0.1:4444";
}


// $(document).ready(function () {
// 	frames.start();
// 	sp2tx.start();
// });

function setup() {
	frames.start();
	sp2tx.start();
}

var frames = {
	socket: null,

	start: function () {
		var url = "ws://" + host + "/frames";
		this.socket = new WebSocket(url);
		this.socket.onmessage = function (event) {
			frames.processFrame(JSON.parse(event.data));
		};
	},

	processFrame: function (data) {
		if (data.people) {
			for (const person of data.people) {
				// Process each person's data
				this.processPerson(person);
			}
		}
	},

	processPerson: function (person) {
		const bodyId = person.body_id;
		const joints = person.joints;

		const shoulderLeft = joints[5];
		const handLeft = joints[8];
		const shoulderRight = joints[12];
		const handRight = joints[14];

		this.checkPosture(shoulderLeft, handLeft, shoulderRight, handRight, bodyId);
	},

	checkPosture: function (
		shoulderLeft,
		handLeft,
		shoulderRight,
		handRight,
		bodyId
	) {
		const raiseThreshold = 50; // The minimum distance the hand needs to be above the shoulder

		if (
			handLeft.position.y > shoulderLeft.position.y + raiseThreshold &&
			handLeft.confidence >= 2
		) {
			this.selectOption(1, bodyId);
		} else if (
			handRight.position.y > shoulderRight.position.y + raiseThreshold &&
			handRight.confidence >= 2
		) {
			this.selectOption(2, bodyId);
		}
	},

	selectOption: function (optionNumber, bodyId) {
		console.log(`Body ID ${bodyId} selected option ${optionNumber}`);
		if (optionNumber === 1) {
			// Option 1 leads to scanning
			console.log("Option 1 selected - Left hand raised");
			window.location.href = "scanning.html";
		} else if (optionNumber === 2) {
			// Option 2 selection leads to celebration
			console.log("Option 2 selected - Right hand raised");
			window.location.href = "celebration.html";
		}
	},
};

var sp2tx = {
	socket: null,

	start: function () {
		var url = "ws://" + host + "/sp2tx";
		this.socket = new WebSocket(url);
		this.socket.onmessage = function (event) {
			var text = event.data;
			if (text !== "") {
				console.log("/sp2tx received: " + text);
			}
		};
	},
};


// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();

//   document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});