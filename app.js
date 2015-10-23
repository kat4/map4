var Server = require('./server.js');
var http = require('http');
console.log('server running on port:1337');
//http.createServer(Handler).listen(1337);
//io.listen(1337);

var port = process.env.PORT || 1337;
console.log('app js is here');

Server.server.listen(port);
