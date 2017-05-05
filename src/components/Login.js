import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleInput(ev) {
        this.setState({
            value: ev.target.value
        });
    }
    
    render() {
        return(
            <div>
                <TextField style={{position: 'absolute', width: '300px', left: 'calc(50% - 150px)', top: 'calc(50% - 50px)'}} placeholder='Username' value={this.state.value} onChange={this.handleInput.bind(this)}/>
                <RaisedButton style={{position: 'absolute', width: '300px', left: 'calc(50% - 150px)', top: 'calc(50% + 50px)'}} onTouchTap={this.props.tryLogin.bind(this, this.state.value)} label='Login' primary={true}/>
            </div>
        )
    }
}