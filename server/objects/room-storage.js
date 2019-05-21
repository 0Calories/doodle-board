class RoomStorage {
  constructor() {
    this.rooms = [];
  }

  createRoom(roomId, maxUsers) {
    const newRoom = { roomId, maxUsers, userArray: [] };
    this.rooms.push(newRoom);
  }

  roomExists(roomId) { 
    const roomExists = this.rooms.find((room) => room.roomId === roomId) ? true : false;
    return roomExists;
  };

  addUserToRoom(user, roomId) {
    const room = this.rooms.find((room) => room.roomId === roomId, () => {
      room.userArray.push(user);
    });
  }

  removeUserFromRoom(user, roomId) {
    const room = this.rooms.find((room) => room.roomId === roomId);
    room.userArray = room.userArray.filter((currentUser) => currentUser.userId === user.userId );
  }
}

module.exports = { RoomStorage };