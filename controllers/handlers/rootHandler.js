var fs = require('fs');
var index = fs.readFileSync('./views/index.html');
function rootHandler(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html'
    });
    res.end(index);
}


module.exports = rootHandler;
