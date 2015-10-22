// var fs = require('fs');
// var index = fs.readFileSync('./views/index.html');
// function rootHandler(req,res){
//     res.writeHead(200,{
//         'Content-Type':'text/html'
//     });
//     res.end(index);
// }
//
//
// module.exports = rootHandler;

var https = require('https');
var fs = require('fs');
var index = fs.readFileSync('./views/index.html');
var lastValue = [];
var newValue = [];

var rootHandler = function(req, res) {
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
        var parsedStr = JSON.parse(str);
        var timeToStation = [parsedStr[0].timeToStation, parsedStr[1].timeToStation].toString();
        newValue = timeToStation;
        if (newValue !== lastValue) {
          io.emit("update train data", parsedStr);
          console.log(str);
          lastValue = newValue;
        }
      });



    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
  getTflData();
  var tflDataInterval = setInterval(getTflData, 5000);
  //clearInterval(tflDataInterval);


  return {
    tflDataInterval: tflDataInterval
  };

};

module.exports = rootHandler;
