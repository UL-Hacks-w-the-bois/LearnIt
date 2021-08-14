const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io')
const io = socketio(server);
const formatQuestion = require('./utils/questions');
const {userJoin, getCurrentUser} = require('./utils/users');

//Setting the static folder
app.use(express.static(path.join(__dirname,'public')));

//Server listenting for connection
io.on('connection', socket => {
    console.log("connection made");

    //listening for joinAp to create a user and join them
    socket.on('joinApp', ({username, qualification}) =>{
        const user = userJoin(socket.id, username, qualification)
    })

    //Listening for post in order to emit postMade
    socket.on('post', (question) =>{
        const user = getCurrentUser(socket.id);
        io.emit('postMade', (formatQuestion(user.username, user.qualification, question)));
        
    });

    

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log("Server Running on " + PORT));