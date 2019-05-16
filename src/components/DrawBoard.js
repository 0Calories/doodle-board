import React from 'react';

export default class DrawBoard extends React.Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  render() {
    return (
      <div className="draw-board" style={{ height: this.state.height }}>
        <canvas ref="canvas" width={this.state.width * 0.95} height={this.state.height} className="draw-board__canvas" />
      </div>
    );
  }
}