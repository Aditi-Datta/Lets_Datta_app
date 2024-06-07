// node server which will handle socket io connections
const io  = require ('socket.io')(8000)

const users = {};

io.on('connetion', socket => {
    socket.on('user-joined', name => {
        
    })
})