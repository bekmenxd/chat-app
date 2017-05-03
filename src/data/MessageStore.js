import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher.js';

const io = require('socket.io-client');
const socket = io();

class MessageStore extends EventEmitter {
    constructor() {
        super();
        this.messages = [];

        socket.on('receivednewmessage', data => {
            this.newMessageFromSocket(data.user, data.message);
        });
    }

    getAll() {
        for (let i = 0; i < this.messages.length; i++) {
            this.messages[i] = {
                user: this.messages[i].user,
                message: this.messages[i].message,
                offset: this.messages[i].offset + 1
            }
        }

        return (this.messages)
    }

    newMessageFromSocket(user, message) {
        console.log('we update bois');
        this.messages.push({user: user, message: message, offset: 0});
        this.emit('change');
    }

    newMessage(user, message) {
        this.messages.push({user: user, message: message, offset: 0});

        socket.emit('addednewmessage', {user: user, message: message});

        this.emit('change');
    }

    handleActions(action) {
        switch(action.type) {
            case "NEW_MESSAGE": {
                this.newMessage(action.user, action.message);
                break;
            }
            default: {
                break;
            }
        }
    }
}

const messageStore = new MessageStore();

Dispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;