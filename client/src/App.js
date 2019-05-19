import React from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios'

import DrawBoard from './components/DrawBoard';

export default class App extends React.Component {

  state = {
    socket: undefined,
    roomId: undefined
  }

  handleJoinRoom = async (event) => {
    event.preventDefault();

    // Code for joining a Socket.io room here
    try {
      const response = await axios.get(`http://192.168.0.24:6969/room/${this.state.roomId}`);
      console.log(response);
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
        <DrawBoard socket={this.state.socket} />
      </div>
    );
  }
}