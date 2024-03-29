

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

function promptForUsername() {
  let username = getUsernameFromStorage();
  if (!username) {
    username = prompt("Enter your username:");
    storeUsernameInStorage(username);
  }
  return username;
}

