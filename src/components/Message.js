import React, { Component } from 'react';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                position: 'absolute',
                top: 'calc(100% - 50px - 70px * ' + this.props.offset + ')',
                height: '100px',
                width: '100%',
                user: {
                    position: 'absolute',
                    margin: '0',
                    left: '25px',
                },
                message: {
                    position: 'absolute',
                    margin: '0',
                    left: '25px',
                    top: '25px'
                }
            }
        }
    }

    render() {
        return (
        <div style={this.state.style}>
            <h3 style={this.state.style.user}>{this.props.user}</h3>
            <p style={this.state.style.message}>{this.props.message}</p>
        </div>    
        )
    }
}