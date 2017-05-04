const app = require('express')();
const express = require('express');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', 'src')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

const http = require('http').createServer(app);

http.listen(3000, () => {
    console.log('Listening on port 3000!');
});

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('addednewmessage', (data) => {
        console.log(data.user + ' sent "' + data.message + '".');
        socket.broadcast.emit('receivednewmessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});