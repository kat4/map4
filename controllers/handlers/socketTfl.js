module.exports = function(req, res) {
  var socket = require('socket.io-client')('https://api.tfl.gov.uk/StopPoint/490005183E/arrivals');
  console.log('attempting to connect to tfl socket');
  socket.on('connect', function() {
    console.log('connected');
    res.end('connected');
  });
  socket.on('event', function(data) {
    var dataObject = JSON.parse(data);
    console.log(dataObject);
  });
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
  socket.on('connect_error',function(error){
      console.log(error);
  });
  socket.on('connect_timeout',function(error){
      console.log('timeout');
  });

};
