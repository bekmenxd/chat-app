const app = require('express')();
const express = require('express');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const http = require('http').createServer(app);

http.listen(5000, () => {
    console.log('Listening on port 3000!');
});

const io = require('socket.io')(http);

let users = [];

io.on('connection', (socket) => {

    socket.on('newmessage', (data) => {
        console.log(data.user + ' sent "' + data.message + '".');
        socket.broadcast.emit('receivednewmessage', data);
    });

    socket.on('newuser', (data) => {
        console.log(data + ' joined');
        users.push({name: data, id: socket.id});
        io.emit('userjoined', users);
    })

    socket.on('disconnect', () => {
        console.log(users.filter(u => u.id === socket.id)[0].name + ' disconnected')
        users = users.filter(u => u.id !== socket.id)
        io.emit('userleft', users)
    });
});