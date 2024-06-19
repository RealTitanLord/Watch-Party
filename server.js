const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/features", (req, res) => {
  res.render("features");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/room", (req, res) => {
  res.render("room");
});

app.get("/create-room", (req, res) => {
  const roomId = uuidv4();
  res.render("create-room", { roomId });
});

app.get("/join-room", (req, res) => {
  res.render("join-room");
});

app.post("/join", (req, res) => {
  const roomId = req.body.roomId;
  res.redirect(`/room/${roomId}`);
});
app.get("/room/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  // Render the room view (you can customize this according to your frontend framework)
  res.render(__dirname + "/src/room.ejs");
});

var clients = 0;

io.on("connection", function (socket) {
  clients++;
  socket.emit("newclientconnect", { description: "Hey, welcome!" });
  socket.broadcast.emit("newclientconnect", {
    description: clients + " clients connected!",
  });
  socket.on("disconnect", function () {
    clients--;
    socket.broadcast.emit("newclientconnect", {
      description: clients + " clients connected!",
    });
  });
});


// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("join-room", (roomId, userName) => {
//     socket.join(roomId); // Join the specified room
//     console.log(`User ${userName} joined room ${roomId}`);
//     socket.to(roomId).emit("user-joined", userName);
//     socket.userName = userName;
//   });

//   socket.on("send-chat-message", (roomId, userId, message) => {
//     io.to(roomId).emit("chat-message", { userId, message });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//     io.to(roomId).emit("user-left", userId);
//   });
// });

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
