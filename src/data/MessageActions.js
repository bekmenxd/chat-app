import Dispatcher from './Dispatcher.js';

export function newMessage(user, message) {
    Dispatcher.dispatch({
        type: 'NEW_MESSAGE',
        user: user,
        message: message
    });
}