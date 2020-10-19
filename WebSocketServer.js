var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

// //Whenever someone connects this gets executed
// io.on('connection', (socket) => {
//     console.log("Connection to WebSocket successful");
//     // socket.emit("chat-message", "MEssage sent form socket");
// });  

// app.get('/', (req, res) => {
//   res.sendFile("index.html");
//     // console.log("8000 running");
// });

io.on('connection', (socket) => {
  console.log('Successful connection to WebSocket');

  socket.on('disconnect', () => {
    console.log('Socket connection disconnected');
  });

  socket.on('send-message', (data) => {
    console.log('WSS --> Client send-message'+ data);
    socket.broadcast.emit("get-message", data);
  });


});

// const io = require("socket.io")(8000)

httpServer.listen(8000, () => {
  console.log('listening on *:8000');
});