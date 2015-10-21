var shot = require('shot');
var test = require('tape');
var Server = require("../server.js");


test('basic mathematics', function(t){
    t.equal(1+1,2, 'wicked, you got this right!!!~!~!');
    t.end();
});

test('/articles/ url should return hello world in payload', function(t){
    shot.inject(Server, {
        method: "GET",
        url: "/articles/"
    }, function(res) {
        t.equal(res.payload, "Hello World");
        t.end();
    });
});

test('unhandled url should return resource not found', function(t){
    shot.inject(Server, {
        method: "GET",
        url: "/ducktales/"
    }, function(res) {
        t.equal(res.payload, 'Resource not found!');
        t.end();
    });
});

test('testing that index returns 200 okay', function(t){
    shot.inject(Server, {
        method: "GET",
        url: "/"
    }, function(res) {
        t.equal(res.statusCode,200);
        t.end();
    });
});

test('testing that /tflquery returns 200 okay', function(t){
    var tflQueryHandler = require("../controllers/handlers/tflqueryHandler.js");
    shot.inject(Server, {
        method: "GET",
        url: "/tflquery/"
    }, function(res) {
        t.equal(res.statusCode,200);
        // console.log(tflQueryHandler.tflDataInterval);
        // clearInterval(tflQueryHandler.tflDataInterval);
        t.end();
    });

});

// test('testing getFflData function returns data from tfl', function(t){
//         var tflQueryHandler = require("./controllers/handlers/tflqueryHandler.js");
//         tflQueryHandler.getTflData();
//         t.equal(res.statusCode,200);
//         t.end();
// });
