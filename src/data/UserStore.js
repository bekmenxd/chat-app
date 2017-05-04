import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher.js';

const io = require('socket.io-client');
const socket = io();

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.users = [];

        socket.on('userjoined', data => {
            this.addUser(data);
        });
    }

    getAll() {
        return this.users;
    }

    addUser(newUser) {
        this.users = newUser;
        this.emit('change');
    }

    handleActions(action) {

    }
}

const userStore = new UserStore();

Dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;