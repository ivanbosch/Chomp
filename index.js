const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: "*"}
});

var rooms = new Map()

//Set static files
app.use(express.static('src'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
  res.header('Access-Control-Allow-Methods', '')
  next()
});

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
    if (rooms.has(room)) {
      if (rooms.get(room) === 2) {
        console.log("The room is full");
      } else {
        console.log("A user just joined: " + room);
        socket.join(room);
        socket.to(room).emit('opponentJoined', username);
        rooms.set(room, 2);
      }
    } else {
      rooms.set(room, 1)
      console.log("A user just joined: " + room);
      socket.join(room);
      socket.to(room).emit('opponentJoined', username);
    }
  })

  socket.on("leaveRoom", (room) => {
    rooms.set(room, rooms.get(room)-1);
    console.log("Someone left the room");
    socket.leave(room);
  })

  //when a user send back their user the server lets the other know that an opponent joined
  socket.on("sendOpponent", ({room, opponent}) => {
    socket.to(room).emit('opponentReceived', opponent);
  })

  socket.on("lost", (room) => {
    socket.to(room).emit('won');
  })

  socket.on("disconnect", () => {
    console.log("Someone disconnected");
  })

}); 

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening')
});