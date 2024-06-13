// node server which will handle socket io connections
// const io  = require ('socket.io')(8000)

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Allow your client's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// Use the CORS middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));


const users = {};

io.on('connection', (socket) => {
    // console.log('User Connected');

    
    socket.on('new-user-joined', (name) => {
        
        // console.log("New User" , name);

        users[socket.id] =name;
        socket.broadcast.emit('user-joined', name);
       
    });

    socket.on('send' , message => {
        socket.broadcast.emit('receive' , {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('leave' , users[socket.id]);
        delete users[socket.id];
        // console.log('User disconnected');
      });
});

server.listen(8000, () => {
    console.log('Server is listening on port 8000');
    
  });

