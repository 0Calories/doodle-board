const path = require('path');
const express = require('express');

const { generateId } = require('./utils/utils');
const { RoomStorage } = require('./objects/room-storage');
const { User } = require('./objects/user');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 6969;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const MAX_USERS = 4;
const roomStorage = new RoomStorage();

app.use(express.static(publicPath));

/* ========== SOCKET EVENTS ========== */

io.on('connection', (socket) => {
  console.log('New user connected');

  // The packet sent by the client contains just an x and y position.
  socket.on('beginDraw', (packet) => {
    socket.broadcast.to(packet.roomId).emit('userBeginDraw', packet);
  });

  // The packet sent by the client contains a 'brush' object, and an x and y position.
  socket.on('draw', (packet) => {
    socket.broadcast.to(packet.roomId).emit('userDraw', packet);
  });

  // The packet sent by the client contains the roomId, and nickname for the user
  socket.on('joinRoom', (packet) => {
    socket.join(packet.roomId);
    roomStorage.addUserToRoom(new User(socket.id, packet.nickname, packet.roomId));
  });
});

/* ========== API ENDPOINTS ========== */

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

  if (roomStorage.roomExists(roomId)) {
    res.sendStatus(200);
  } else {
    res.status(404).send(`The room with ID ${roomId} does not exist`);
  }
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});