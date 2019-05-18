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
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});