import React from 'react';

let canvas = undefined;
let ctx = undefined;

export default class DrawBoard extends React.Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    isDrawing: false
  };

  drawAtPoint = (x, y) => {
    //ctx.save();
    ctx.fillStyle = `rgba(0,0,0,0.5)`;
    ctx.fillRect(x - 22, y, 5, 5);
    //ctx.restore();
  }

  handleMouseDown = (event) => {
    console.log('Mouse down');
    this.setState({ isDrawing: true });
  }

  handleMouseUp = (event) => {
    console.log('Mouse up');
    this.setState({ isDrawing: false });
  }

  handleMouseMove = (event) => {
    console.log(`(${event.clientX}, ${event.clientY})`);
    if (this.state.isDrawing)
      this.drawAtPoint(event.clientX, event.clientY);
  }

  componentDidMount() {
    canvas = this.refs.canvas
    ctx = canvas.getContext('2d');
  }

  render() {
    return (
      <div className="draw-board" style={{ height: this.state.height }}>
        <canvas 
          ref="canvas" 
          width={this.state.width * 0.95} 
          height={this.state.height} 
          className="draw-board__canvas" 
          onClick={this.onCanvasClick}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    );
  }
}