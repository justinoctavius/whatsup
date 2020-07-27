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

const userConnected = [];
const userData = []

//web Socket
io.on('connection',(socket) => {
    socket.on('userConnected',(data) => {
        if(userConnected.includes(data.username)){
            socket.disconnect(true);
            socket.emit('userConnectedYet',({bool:false}));
        }else{
            userConnected.push(data.username)
            socket.emit('userConnectedYet',({bool:true}));
            
            socket.emit('userConnected',(data));
            console.log('new connection', socket.id);

            socket.on('disconnect', () => {
                socket.emit('clean')
            });

            socket.on('newUserConnected', (data) => {
                    userConnected.push(data.username);
                    userData.push(data)
                    socket.broadcast.emit('newUserConnected', data);
            });

            socket.on('sendMessage', (data) => {
                io.sockets.emit('sendMessage', data);
            });
        }
    })
});