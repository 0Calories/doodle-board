const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 6969;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // The packet sent by the client contains a 'brush' object, and an x and y position.
  socket.on('beginDraw', (packet) => {
    //socket.broadcast.emit()
  });

  // The packet sent by the client contains a 'brush' object, and an x and y position.
  socket.on('draw', (packet) => {
    console.log(`(${packet.x}, ${packet.y})`);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});