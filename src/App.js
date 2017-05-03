import React, { Component } from 'react';
import MessagesArea from './components/MessagesArea.js';
import MessagingArea from './components/MessagingArea.js';
import Login from './components/Login.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    }
  }

  componentWillMount() {
    if (sessionStorage.getItem('hamsolochat')) {
      this.setState({
        view: 
          <div>
            <MessagesArea />
            <MessagingArea user={sessionStorage.getItem('hamsolochat')}/>
          </div>
      });
    } else {
      this.setState({
        view:
          <div>
            <Login success={this.successLogin.bind(this)}/>
          </div>
      })
    }
  }

  successLogin(user) {
    if (user && user.length > 0) {
      sessionStorage.setItem('hamsolochat', user);
      this.setState({
          view: 
            <div>
              <MessagesArea />
              <MessagingArea user={sessionStorage.getItem('hamsolochat')}/>
            </div>
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.view}
      </div>
    );
  }
}
