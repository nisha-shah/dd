var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

io.on("connection", (socket) => {
    console.log("Successful connection to WebSocket");

    socket.on("disconnect", () => {
        console.log("Socket connection disconnected");
    });

    socket.on("send-message", (data) => {
        socket.broadcast.emit("get-message", data);
    });

});

httpServer.listen(8000, () => {
    console.log("listening on *:8000");
});