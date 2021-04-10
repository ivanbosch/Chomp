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

  socket.on("joinRoom", (data) => {
    console.log("A user just joined: " + data);
    socket.join(data);
  })
}); 

server.listen(3000, () => {
  console.log('Server listening')
});
