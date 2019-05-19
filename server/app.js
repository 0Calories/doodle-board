const path = require('path');
const express = require('express');

const { generateId } = require('./utils/utils');
const { RoomStorage } = require('./objects/room-storage');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 6969;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const MAX_USERS = 4;
const roomStorage = new RoomStorage();

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

// Create room endpoint
app.post('/room/create', (req, res) => {
  const roomId = generateId();
  console.log(`Generated new room with ID: ${roomId}`);
  roomStorage.createRoom(roomId, MAX_USERS)
  res.send({ roomId });
});

// Join room endpoint
app.get('/room/:id', (req, res) => {
  const roomId = req.params.id;
  console.log(`User is attempting to join room with ID ${roomId}`);
  console.log(`The room ${roomStorage.roomExists(roomId) ? 'exists' : 'does not exist'}.`);
  res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});