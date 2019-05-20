class RoomStorage {
  constructor() {
    this.rooms = [];
  }

  createRoom(roomId, maxUsers) {
    const newRoom = { roomId, maxUsers, userArray: [] };
    this.rooms.push(newRoom);
  }

  roomExists(roomId) { return this.rooms.find((room) => room.roomId === roomId) };

  addUserToRoom(user, roomId) {
    const room = this.rooms.find((room) => room.roomId === roomId);
    room.userArray.push(user);
  }

  removeUserFromRoom(user, roomId) {
    const room = this.rooms.find((room) => room.roomId === roomId);
    room.userArray = room.userArray.filter((currentUser) => currentUser.userId === user.userId );
  }
}

module.exports = { RoomStorage };