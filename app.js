var Handler = require('./server.js');
var http = require('http');
console.log('server running on port:1337');
//http.createServer(Handler).listen(1337);
//io.listen(1337);
var server = require('http').createServer(Handler);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.emit('update from server', 'win');
  console.log('client connected');
});

server.listen(1337);

module.exports = io;
