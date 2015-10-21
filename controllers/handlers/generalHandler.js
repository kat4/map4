var fs = require('fs');

var generalHandler = function(req, res) {
    fs.readFile("./public" + req.url, function(err, file) {
        if (err) {
            res.writeHead("404", {
                'Content-type': 'text/html'
            });
            res.end('Resource not found!');
        } else {
            var ext = req.url.split(".")[1];
            res.writeHead(200, {
                'Content-type': 'text/' + ext
            });
            res.end(file);
        }
    });
};



module.exports = generalHandler;
