const path = require('path')
const express = require('express');
const app = express();

const SocketIO = require('socket.io')


// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

// Socket.io
const io = SocketIO(server);

//web Socket
io.on('connection',(socket) => {
    console.log('new connection', socket.id);

    socket.on('sendMessage', (data) => {
        io.sockets.emit('sendMessage', data)
    });
});