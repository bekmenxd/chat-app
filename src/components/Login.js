import React, { Component } from 'react';

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
                <input placeholder='Username' value={this.state.value} onChange={this.handleInput.bind(this)}/>
                <button onClick={this.props.success.bind(this, this.state.value)}>Login</button>
            </div>
        )
    }
}