var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var zerorpc = require("zerorpc");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:5555');

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('Receive SocketIO message: ' + msg);
    client.invoke("printMessage", msg, function(error, res, more) {
    	console.log(res);
  	});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
