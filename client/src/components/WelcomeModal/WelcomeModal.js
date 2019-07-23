import React from 'react';
import Modal from 'react-modal';
import './styles.scss';

export default class WelcomeModal extends React.Component {

  state = {
    roomId: undefined
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.handleJoinRoom(this.state.roomId);
  }

  render() {
    return (
      <div>
        <Modal
            isOpen={this.props.isModalOpen}
            contentLabel="Welcome to Doodleboard!"
            ariaHideApp={false}
          >
            <h2 className="modal-header">Welcome!</h2>
            <form onSubmit={this.handleFormSubmit}>
              <label className="room-id-label">Room ID:</label>
              <input
                type="text"
                name="roomId"
                value={this.state.roomId}
                onChange={this.handleChange}
                className="room-id-input"
              />
              <input 
                type="submit" 
                value="Join" 
                className="join-button"
              />
            </form>
          </Modal>
        </div>
    );
  }
}