import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher.js';

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.users = [];
    }

    getAll() {
        return this.users;
    }

    addUser(users) {
        this.users = users;
        this.emit('change');
    }

    removeUser(users) {
        this.users = users;
        this.emit('change');
    }

    handleActions(action) {
        switch(action.type) {
            case "USER_JOINED": {
                this.addUser(action.users);
                break;
            }
            case "USER_LEFT": {
                this.removeUser(action.users);
                break;
            }
            default: {
                break;
            }
        }
    }
}

const userStore = new UserStore();

Dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;