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
        return (this.messages.reverse())
    }

    newMessageFromSocket(user, message) {
        console.log('we update bois');
        this.messages.push({user: user, message: message});
        this.emit('change');
    }

    newMessage(user, message) {
        this.messages.push({user: user, message: message});

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