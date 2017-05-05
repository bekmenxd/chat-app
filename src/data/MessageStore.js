import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher.js';

class MessageStore extends EventEmitter {
    constructor() {
        super();
        this.messages = [];
    }

    getAll() {
        return (this.messages.reverse())
    }

    newMessage(user, message) {
        this.messages.push({user: user, message: message});
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