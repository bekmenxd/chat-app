import React, { Component } from 'react';
import MessagesArea from './components/MessagesArea.js';
import MessagingArea from './components/MessagingArea.js';
import * as MessageActions from './data/MessageActions.js';
import Login from './components/Login.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from './components/UserList.js';
import * as UserActions from './data/UserActions.js';

const io = require('socket.io-client');
const socket = io();

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    }
  }

  emitNewMessage(user, message) {
    socket.emit('newmessage', {user: user, message: message})
  }

  componentWillMount() {
    if (sessionStorage.getItem('hamsolochat')) {
      this.setState({
        view: 
          <div>
            <MessagingArea emit={this.emitNewMessage.bind(this)} user={sessionStorage.getItem('hamsolochat')}/>
            <MessagesArea/>
            <UserList/>
          </div>
      });
    } else {
      this.setState({
        view:
          <div>
            <Login tryLogin={this.tryLogin.bind(this)}/>
          </div>
      })
    }

    socket.on('userjoined', (data) => {
        UserActions.addUser(data);
    });

    socket.on('userleft', (data) => {
        UserActions.removeUser(data);
    });

    socket.on('receivednewmessage', (data) => {
        MessageActions.newMessage(data.user, data.message);
    });
  }

  tryLogin(user) {
    if (user && user.length > 0) {

      socket.emit('newuser', user);

      sessionStorage.setItem('hamsolochat', user);
      this.setState({
          view: 
            <div>
              <MessagingArea emit={this.emitNewMessage.bind(this)} user={sessionStorage.getItem('hamsolochat')}/>
              <MessagesArea />
              <UserList />
            </div>
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.state.view}
      </MuiThemeProvider>
    );
  }
}
