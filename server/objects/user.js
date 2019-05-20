class User {
  constructor(socketId, nickname, roomId) {
    this.socketId = socketId;
    this.nickname = nickname;
    this.roomId = roomId;
  }
}

module.exports = { User };