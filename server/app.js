const path = require('path');
const express = require('express');
const { generateId } = require('./utils/utils');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 6969;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(publicPath));

// Sockets
io.on('connection', (socket) => {
  console.log('New user connected');

  // The packet sent by the client contains just an x and y position.
  socket.on('beginDraw', (packet) => {
    socket.broadcast.emit('userBeginDraw', packet);
  });

  // The packet sent by the client contains a 'brush' object, and an x and y position.
  socket.on('draw', (packet) => {
    socket.broadcast.emit('userDraw', packet);
  });
});

// Routes
app.post('/room/create', (req, res) => {
  const roomId = generateId();
  console.log(`Generated new room with ID: ${roomId}`);
  res.send({ roomId });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});