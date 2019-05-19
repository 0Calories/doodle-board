class RoomStorage {
  constructor() {
    this.rooms = [];
  }

  createRoom(roomId, maxUsers) {
    const newRoom = { roomId, maxUsers };
    this.rooms.push(newRoom);
  }

  roomExists(roomId) { return this.rooms.find((room) => room.roomId === roomId) };
}

module.exports = { RoomStorage };