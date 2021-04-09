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
  
  socket.on("transformation", (data) => {
    console.log("transformation received");
    socket.broadcast.emit('transformation', data);
  }) 
}); 

server.listen(3000, () => {
  console.log('Server listening')
});
