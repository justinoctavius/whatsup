const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');

// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//middleware
app.use(express.json());

//routes
app.use(require('./routes/routes'));

// Socket.io
const io = SocketIO(server);

//Check if user is connected

//web Socket
io.on('connection',(socket) => {
    console.log('new connection', socket.id);
    
    socket.on('newUserConnected', (data) => {
        socket.broadcast.emit('newUserConnected', data);
    });

    socket.on('sendMessage', (data) => {
        io.sockets.emit('sendMessage', data);
    });
});