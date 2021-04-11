const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: "*"}
});

//Set static files
app.use(express.static('src'))

//Set views
app.set("views", './views');
app.set("view engine", "ejs");

app.get('', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {

  console.log("A user has connected");
  
  socket.on("transformation", ({room, move}) => {
    console.log("transformation received on: " + room);
    socket.to(room).emit('transformation', move);
  })

  //The server receives that a user joined a room
  socket.on("joinRoom", ({room, username}) => {
    console.log("A user just joined: " + room);
    socket.join(room);
    socket.to(room).emit('opponentJoined', username);
  })

  socket.on("leaveRoom", (room) => {
    console.log("Someone left the room")
    socket.leave(room);
  })

  //when a user send back their user the server lets the other know that an opponent joined
  socket.on("sendOpponent", ({room, opponent}) => {
    socket.to(room).emit('opponentReceived', opponent);
  })

  socket.on("lost", (room) => {
    socket.to(room).emit('won');
  })
}); 

server.listen(3000, () => {
  console.log('Server listening')
});
