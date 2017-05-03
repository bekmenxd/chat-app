import React, { Component } from 'react';
import Message from './Message.js';
import MessageStore from '../data/MessageStore.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  componentWillMount() {
    MessageStore.on('change', () => {
      this.setState({
        messages: MessageStore.getAll().map(m => <Message user={m.user} message={m.message} offset={m.offset} key={m.offset}/>)
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.messages}
      </div>
    );
  }
}
