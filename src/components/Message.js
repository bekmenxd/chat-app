import React, { Component } from 'react';

export default class Message extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <h2 style={{paddingLeft: '16px', color: 'rgba(0, 0, 0, 0.4)'}}>{this.props.user}</h2>
                <p style={{paddingLeft: '32px', fontSize: '20px'}}>{this.props.message}</p>
            </div>
        )
    }
}