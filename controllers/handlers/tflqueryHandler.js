var https = require('https');

module.exports = function(req, res) {

  var reqTflUrl = 'https://api.tfl.gov.uk/Line/waterloo-city/Arrivals?';
  setInterval(function() {
    https.get(reqTflUrl, function(response) {
      console.log("Got response: " + response.statusCode);
      var str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });
      response.on('end', function() {
        console.log(str);
        res.writeHead("200", {
          'Content-Type': 'text/html'
        });
        res.end(str);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  },5000);
};
