import React from 'react';

let canvas = undefined;
let ctx = undefined;

export default class DrawBoard extends React.Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    isDrawing: false
  };

  getMousePos = (event) => {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  drawAtPoint = (x, y) => {
    ctx.fillStyle = `rgba(0,0,0,0.5)`;
    ctx.fillRect(x - 22, y, 5, 5);
  }

  handleMouseDown = (event) => {
    const mousePos = this.getMousePos(event);
    console.log('Mouse down');
    this.setState({ isDrawing: true });
    ctx.strokeStyle = `rgba(0,0,0,0.5)`;
    ctx.strokeWidth = 5;
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
  }

  handleMouseUp = (event) => {
    console.log('Mouse up');
    this.setState({ isDrawing: false });
  }

  handleMouseMove = (event) => {
    const mousePos = this.getMousePos(event);
    console.log(`(${event.clientX}, ${event.clientY})`);
    if (this.state.isDrawing) {
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    }
      //this.drawAtPoint(event.clientX, event.clientY);
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