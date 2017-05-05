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
      this.props.emit(this.props.user, this.state.value);
    }
  }

  newMessageWithKey(ev) {
    if (ev.keyCode === 13 && !ev.shiftKey) {
        ev.preventDefault();
        if (/\S/.test(this.state.value)) {
            MessageActions.newMessage(this.props.user, this.state.value)
            this.setState({
                value: ''
            });
            this.props.emit(this.props.user, this.state.value);
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
      <Toolbar style={{position: 'fixed', height: '90px', width: 'calc(100% - 250px)', top: '0', maxHeight: '90px', overflow: 'auto'}}>
          <ToolbarGroup firstChild={true} style={{width: '80%'}}>
            <TextField
                style={{width: '80%', margin: 15}}
                onKeyDown={this.newMessageWithKey.bind(this)}
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