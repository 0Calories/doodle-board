import React from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios'
import Modal from 'react-modal';

import DrawBoard from './components/DrawBoard';

export default class App extends React.Component {

  state = {
    socket: undefined,
    roomId: undefined,
    isModalOpen: true
  }

  handleJoinRoom = async (event) => {
    event.preventDefault();

    // Code for joining a Socket.io room here
    try {
      const roomId = this.state.roomId;
      const response = await axios.get(`/room/${roomId}`);

      if (response.status === 200) {
        // Perform further checks in the future here, i.e room is full
        this.state.socket.emit('joinRoom', {
          roomId,
          nickname: 'Test'
        });

        // Close the modal 
        this.setState({ isModalOpen: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    // Connect to the server's websocket
    this.setState({ socket: openSocket('http://192.168.0.24:6969') });
  }

  render() {
    return (
      <div className="App">
        <Modal
          isOpen={this.state.isModalOpen}
          contentLabel="Welcome to Doodleboard!"
        >

          <form onSubmit={this.handleJoinRoom}>
            <label>Room ID:</label>
            <input
              type="text"
              name="roomId"
              value={this.state.roomId}
              onChange={this.handleChange}
            />
            <input type="submit" value="Join" />
          </form>
          
        </Modal>

        <DrawBoard 
          socket={this.state.socket} 
          roomId={this.state.roomId}
        />
      </div>
    );
  }
}