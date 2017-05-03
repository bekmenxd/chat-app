const app = require('express')();
const express = require('express');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const http = require('http').createServer(app);

http.listen(9000, () => {
    console.log('Listening on port 9000!');
});

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('addednewmessage', (data) => {
        socket.broadcast.emit('receivednewmessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});