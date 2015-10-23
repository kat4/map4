var Handler = require('./server.js');
var http = require('http');
console.log('server running on port:1337');
//http.createServer(Handler).listen(1337);
//io.listen(1337);
var server = require('http').createServer(Handler);
var io = require('socket.io')(server);
var port = process.env.PORT || 1337;

io.on('connection', function(socket){
  socket.emit('update from server', 'win');
  console.log('client connected');
});

server.listen(port);

module.exports = io;
