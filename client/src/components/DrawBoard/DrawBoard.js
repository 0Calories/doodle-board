import React from 'react';

let canvas = undefined;
let ctx = undefined;

export default class DrawBoard extends React.Component {

  state = {
    enabled: false,
    width: window.innerWidth,
    height: window.innerHeight,
    isDrawing: false,
    brush: {
      color: `rgba(0,0,0,0.5)`,
      width: 5
    }
  };

  getMousePos = (event) => {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  beginDraw = (brush, x, y) => {
    ctx.strokeStyle = brush.color;
    ctx.strokeWidth = brush.width;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  draw = (x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  handleMouseDown = (event) => {
    const mousePos = this.getMousePos(event);
    this.setState({ isDrawing: true });
    this.beginDraw(this.state.brush, mousePos.x, mousePos.y);

    // Communicate to the server that a user started drawing a brush stroke
    this.props.socket.emit('beginDraw', {
      brush: this.state.brush,
      x: mousePos.x,
      y: mousePos.y,
      roomId: this.props.roomId
    });
  }

  handleMouseUp = (event) => {
    this.setState({ isDrawing: false });
  }

  handleMouseMove = (event) => {
    if (this.state.isDrawing && this.state.enabled) {
      const mousePos = this.getMousePos(event);
      this.draw(mousePos.x, mousePos.y)

      // Communicate to the server that a user is currently drawing
      this.props.socket.emit('draw', {
        x: mousePos.x,
        y: mousePos.y,
        roomId: this.props.roomId
      });
    }
  }

  componentDidMount() {
    canvas = this.refs.canvas
    ctx = canvas.getContext('2d');
  }

  // In the case of DrawBoard, this lifecycle method will only be called once the socket object is set in props
  componentDidUpdate(prevProps) {
    if (this.props.socket !== prevProps.socket) {
      this.setState({ enabled: true });
      // Set up socket receive events here
      this.props.socket.on('userBeginDraw', (packet) => {
        this.beginDraw(packet.brush, packet.x, packet.y);
      });

      this.props.socket.on('userDraw', (packet) => {
        this.draw(packet.x, packet.y);
      });
    }
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