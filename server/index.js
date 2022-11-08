let express = require('express');
let app = express();
let server = require('http').Server(app);
let port = 6677;

let io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
});

let messages = [{
    id: 1,
    text: 'Welcome to Socket Chat!',
    nickname: 'Bot - John'
}];

app.use(express.static('client'));

app.get('/hello-world', function(req, res){
    res.status(200).send('Hello World!');
});

io.on('connection', function(socket){
    console.log('Someone is connect... IP: ' + socket.handshake.address);

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(port, function() {
    console.log('Server Available in port: ' + port);
});
