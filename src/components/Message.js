import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Message extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <h2 style={{paddingLeft: '16px', color: 'rgba(0, 0, 0, 0.4)'}}>{this.props.user}</h2>
                <div style={{paddingLeft: '32px', fontSize: '18px', width: 'calc(100% - 64px)'}}>
                    <ReactMarkdown source={this.props.message} />
                </div>
            </div>
        )
    }
}