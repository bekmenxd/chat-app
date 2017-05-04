import React, { Component } from 'react';
import * as MessageActions from '../data/MessageActions.js';
import { RaisedButton, TextField, Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui'

export default class MessagingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  newMessage() {
    if (/\S/.test(this.state.value)) {
      MessageActions.newMessage(this.props.user, this.state.value)
      this.setState({
        value: ''
      });
    }
  }

  newMessageWithKey(ev) {
    if (ev.keyCode === 13) {
        if (/\S/.test(this.state.value)) {
            MessageActions.newMessage(this.props.user, this.state.value)
            this.setState({
                value: ''
            });
        }
    }
  }

  handleInput(ev) {
    this.setState({
      value: ev.target.value
    });
  }

  render() {
    return (
      <Toolbar style={{height: 'auto', width: '100%'}}>
          <ToolbarGroup firstChild={true} style={{width: '80%'}}>
            <TextField
                style={{width: '80%', margin: 15}}
                onKeyUp={this.newMessageWithKey.bind(this)}
                multiLine={true}
                hintText='New message' 
                onChange={this.handleInput.bind(this)} 
                value={this.state.value}/>
            
            <RaisedButton
                primary={true}
                label="Send"
                onTouchTap={this.newMessage.bind(this)} />

            <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
            <ToolbarTitle text={this.props.user} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}