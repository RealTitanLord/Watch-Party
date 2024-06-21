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

//Scorll Bar
$(window).load(function () {
  $messages.mCustomScrollbar();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}
