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
  let users ={};
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
  res.render("room");
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join room", ({ room, user_name }) => {
    if (!isUsernameTaken(user_name)) {
      users[socket.id] = user_name;
      socket.join(room);
      console.log(`User ${user_name} joined room: ${room}`);
      io.to(room).emit("chat message", {
        user_name: "System",
        message: `Welcome, ${user_name}! Enjoy the party`,
        time: new Date().toLocaleTimeString(),
      });

      // Notify other users
      socket.broadcast
        .to(room)
        .emit("chat message", {
          user_name: "System",
          message: `${user_name} has joined the room`,
          time: new Date().toLocaleTimeString(),
        });
    } else {
      socket.emit("username taken", "Username is already taken");
    }
  });

  socket.on("chat message", ({ room, user_name, message }) => {
    const time = new Date().toLocaleTimeString();
    io.to(room).emit("chat message", { user_name, message, time });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user_name = users[socket.id];
    if (user_name) {
      const room = Object.keys(socket.rooms)[1]; // Get the room name
      io.to(room).emit("chat message", {
        user_name: "System",
        message: `${user_name} has left the room`,
        time: new Date().toLocaleTimeString(),
      });
      delete users[socket.id];
    }
  });

  const isUsernameTaken = (user_name) => {
    return Object.values(users).includes(user_name);
  };
});  

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
