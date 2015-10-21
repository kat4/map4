
module.exports = function(req,res,match){
    res.writeHead("200",{
        'Content-type':'text/html'
    });
    res.end('Hello World');
};
