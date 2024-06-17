//Changes Audio Icon
document.getElementById("audio-btn").addEventListener("click", function () {
	var micIcon = document.getElementById("audio-icon");
	var textDiv = document.getElementById("audio-text");
	var textDivStyle = textDiv.style;

	if (micIcon.textContent === "mic") {
		micIcon.textContent = "mic_off";
		textDiv.textContent = "Unmute";
		textDivStyle.margin = "0";
	} else {
		micIcon.textContent = "mic";
		textDiv.textContent = "Mute";
		textDivStyle.margin = "0 1.5em";
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
$(document).on('click', '.chat-header i.fa-minus', function (e) {
    var $this = $(this);
    var $panel = $this.closest('.card');
    var $panelBody = $panel.find('.chat-window');

    if (!$this.hasClass('panel-collapsed')) {
        $panelBody.slideUp();
        $this.addClass('panel-collapsed');
        $this.text('+');
    } else {
        $panelBody.slideDown();
        $this.removeClass('panel-collapsed');
        $this.text('-');
    }
});

$(document).on('focus', '.chat-input input.message-input', function (e) {
    var $panel = $(this).closest('.card');
    var $minimizeChat = $panel.find('.fa-minus');

    if ($minimizeChat.hasClass('panel-collapsed')) {
        $panel.find('.chat-window').slideDown();
        $minimizeChat.removeClass('panel-collapsed');
        $minimizeChat.text('-');
    }
});

$(document).on('click', '#new_chat', function (e) {
    var $lastChatWindow = $(".chat-window:last-child");
    var lastChatWindowMargin = parseInt($lastChatWindow.css("margin-left")) || 0;
    var sizeTotal = lastChatWindowMargin + 400;
    alert(sizeTotal);
    var $clone = $("#chat_window_1").clone().appendTo(".container");
    $clone.css("margin-left", sizeTotal);
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
