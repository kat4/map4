var router = require('./controllers/router.js');
var url = require('url');
var articleHandler = require('./controllers/handlers/articleHandler.js');
var generalHandler = require('./controllers/handlers/generalHandler.js');
var rootHandler = require('./controllers/handlers/rootHandler.js');

var server = require('http').createServer(handler);
var io = require('socket.io')(server);
io.on('connection', function(socket){
  socket.emit('update from server', 'win');
  console.log('client connected');
});



router.addRoute('/articles/', articleHandler);
router.addRoute('/', rootHandler);


function handler(req, res) {
    var path = url.parse(req.url).pathname;
    var match = router.match(path);
    if (match) {
        match.fn(req, res, match);
    } else {
        generalHandler(req, res);
    }

}


module.exports = {handler: handler,
                  server: server,
                  io: io
                };
