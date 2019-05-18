import React from 'react';
import openSocket from 'socket.io-client';
import DrawBoard from './components/DrawBoard';

export default class App extends React.Component {

  state = {
    socket: undefined
  }

  componentDidMount() {
    // Connect to the server's websocket
    this.setState({ socket: openSocket('http://localhost:6969') });
  }

  render() {
    return (
      <div className="App">
        <DrawBoard socket={this.state.socket} />
      </div>
    );
  }
}