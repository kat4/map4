var https = require('https');
var fs = require('fs');
var index = fs.readFileSync('./views/index.html');


var tflQueryHandler = function(req, res) {
  var io = require('../../app.js');
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(index);
  var reqTflUrl = 'https://api.tfl.gov.uk/Line/waterloo-city/Arrivals?';


  function getTflData() {
    https.get(reqTflUrl, function(response) {
      console.log("Got response: " + response.statusCode);
      var str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });
      response.on('end', function() {


        io.emit("update from server", str);
        console.log(str);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
  getTflData();
  var tflDataInterval = setInterval(getTflData, 5000);
  console.log(tflDataInterval);
  clearInterval(tflDataInterval);


  return {
    tflDataInterval: tflDataInterval
  };

};

module.exports = tflQueryHandler;
