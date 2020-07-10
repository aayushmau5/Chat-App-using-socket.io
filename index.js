//Adding the modules
let express = require('express');
let socket = require('socket.io');

//App setup(express)
let app = express();
let server = app.listen(4000, () => {
    console.log("Listening on port 4000.....");
})

//Static files 
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', (socket) => {
    console.log('Made socket connection');

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});