var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); 

// homepage for the app
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

var port = process.env.PORT || 3000;

http.listen(port, function() {
    console.log('listening on *: ' + port);
});

//socket calls from client server when someone connects
io.on('connection', function(socket) {
    console.log('new connection');

//socket calls from client mouse clicks
// Called when the client calls socket.emit('move')
    socket.on('move', function(msg) {
       socket.broadcast.emit('move', msg); 
    });
});