const assert = require('assert');
const expect = require('chai').expect;

const { RoomStorage } = require('./room-storage');

describe('RoomStorage', () => {
  let roomStorage;

  // Set up before each test
  beforeEach(() => {
    roomStorage = new RoomStorage();
    roomStorage.createRoom('V4POI', 4);
    roomStorage.createRoom('33DJO', 4);
  });

  it('should add a new room to the roomStorage array', () => {
    roomStorage.createRoom('0R8ED', 5);
    expect(roomStorage.rooms.length).to.equal(3);
  });

  it('should return true when searching for a room that exists', () => {
    expect(roomStorage.roomExists('V4POI')).to.equal(true);
  });

  it('should return false when searching for a room that doesn\'t exist', () => {
    expect(roomStorage.roomExists('ASDF69')).to.equal(false);
  });
});

