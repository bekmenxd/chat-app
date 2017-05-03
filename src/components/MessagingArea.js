import React, { Component } from 'react';
import * as MessageActions from '../data/MessageActions.js';

export default class MessagingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      style: {
        messageArea: {
          position: 'fixed',
          top: 'calc(100% - 75px)',
          width: '100%',
          height: '75px',
          border: '1px solid lightgray',
          input : {
            position: 'absolute',
            width: '50%',
            top: '10px',
            left: '10px',
            padding: 0,
            height: '50px',
            resize: 'none'
          },
          button: {
            position: 'absolute',
            left: 'calc(50% + 70px)',
            width: '70px',
            height: '50px',
            top: '10px'
          },
          username: {
            position: 'absolute',
            left: 'calc(50% + 200px)',
            lineHeight: '75px',
            margin: 0,
          }
        }
      }
    }
  }

  newMessage() {
    if (/\S/.test(this.state.value)) {
      MessageActions.newMessage(this.props.user, this.state.value)
    }
  }

  handleInput(ev) {
    this.setState({
      value: ev.target.value
    });
  }

  render() {
    return (
      <div>
        <div style={this.state.style.messageArea}>

          <textarea 
            style={this.state.style.messageArea.input} 
            placeholder='New message' 
            onChange={this.handleInput.bind(this)} 
            value={this.state.value}/>
            
          <button 
            style={this.state.style.messageArea.button} 
            onClick={this.newMessage.bind(this)}>Send</button>
          <h2 style={this.state.style.messageArea.username}>Username: {this.props.user}</h2>
        </div>
      </div>
    );
  }
}