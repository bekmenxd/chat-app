import Dispatcher from './Dispatcher.js';

export function addUser(users) {
    Dispatcher.dispatch({
        type: 'USER_JOINED',
        users: users
    })
}

export function removeUser(users) {
    Dispatcher.dispatch({
        type: 'USER_LEFT',
        users: users
    })
}