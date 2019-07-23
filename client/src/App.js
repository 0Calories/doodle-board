import React from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios'
import WelcomeModal from './components/WelcomeModal/WelcomeModal';

import DrawBoard from './components/DrawBoard/DrawBoard';
import './styles.scss';

export default class App extends React.Component {

  state = {
    socket: undefined,
    isModalOpen: true
  }

  handleJoinRoom = async (roomId) => {
    // Code for joining a Socket.io room here
    try {
      const response = await axios.get(`/room/${roomId}`);

      if (response.status === 200) {
        // Perform further checks in the future here, i.e room is full
        this.state.socket.emit('joinRoom', {
          roomId,
          nickname: 'Test'
        });

        // Close the modal 
        this.setState({ isModalOpen: false, roomId });
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
        <link href="https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe&display=swap" rel="stylesheet" />
        <WelcomeModal 
          handleJoinRoom={this.handleJoinRoom}
          roomId={this.state.roomId}
          isModalOpen={this.state.isModalOpen}
        />
        <DrawBoard 
          socket={this.state.socket} 
          roomId={this.state.roomId}
        />
      </div>
    );
  }
}