import React, { Component } from 'react';
import MessagesArea from './components/MessagesArea.js';
import MessagingArea from './components/MessagingArea.js';
import Login from './components/Login.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

  componentWillMount() {
    if (sessionStorage.getItem('hamsolochat')) {
      this.setState({
        view: 
          <div>
            <MessagingArea user={sessionStorage.getItem('hamsolochat')}/>
            <MessagesArea />
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
              <MessagingArea user={sessionStorage.getItem('hamsolochat')}/>
              <MessagesArea />
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
