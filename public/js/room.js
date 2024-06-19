//Changes Audio Icon
document.getElementById("audio-btn").addEventListener("click", function () {
	var micIcon = document.getElementById("audio-icon");
	var textDiv = document.getElementById("audio-text");
	var textDivStyle = textDiv.style;

	if (micIcon.textContent === "mic") {
		micIcon.textContent = "mic_off";
		textDiv.textContent = "Unmute";
		// textDivStyle.margin = "0";
	} else {
		micIcon.textContent = "mic";
		textDiv.textContent = "Mute";
		// textDivStyle.margin = "0 1em";
	}
});
//Changes Video Icon
document.getElementById("video-btn").addEventListener("click", function () {
	var videoIcon = document.getElementById("video-icon");
	var videoText = document.getElementById("video-text");

	if (videoIcon.textContent === "videocam") {
		videoIcon.textContent = "videocam_off";
		videoText.textContent = "Hide";
	} else {
		videoIcon.textContent = "videocam";
		videoText.textContent = "Show";
	}
});
// Initialize Bootstrap tooltip
const tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]'),
);
// eslint-disable-next-line no-unused-vars
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Initialize Bootstrap modal

document.querySelector("#settings-btn").addEventListener("click", function () {
	// Show the modal
	var myModal = new bootstrap.Modal(document.getElementById("settingsModal"));
	myModal.show();
});

// Chatbox

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

//socket logic
const userName = prompt("Please enter your name:");

if (userName) {
	socket.emit("join-room", roomId, userName);
} else {
	alert("You must enter a name to join the room.");
}

function getUsernameFromStorage() {
	return localStorage.getItem("username");
}

function storeUsernameInStorage(username) {
	localStorage.setItem("username", username);
}

// eslint-disable-next-line no-unused-vars
function promptForUsername() {
	let username = getUsernameFromStorage();
	if (!username) {
		username = prompt("Enter your username:");
		storeUsernameInStorage(username);
	}
	return username;
}
