var Handler = require('./server.js');
var http = require('http');

http.createServer(Handler).listen(1337);
