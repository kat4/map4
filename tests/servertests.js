var shot = require('shot');
var test = require('tape');
var handler = require("../server.js").handler;


test('basic mathematics', function(t){
    t.equal(1+1,2, 'wicked, you got this right!!!~!~!');
    t.end();
});

test('/articles/ url should return hello world in payload', function(t){
    shot.inject(handler, {
        method: "GET",
        url: "/articles/"
    }, function(res) {
        t.equal(res.payload, "Hello World");
        t.end();
    });
});

test('unhandled url should return resource not found', function(t){
    shot.inject(handler, {
        method: "GET",
        url: "/ducktales/"
    }, function(res) {
        t.equal(res.payload, 'Resource not found!');
        t.end();
    });
});

test('testing that index returns 200 okay', function(t){
    shot.inject(handler, {
        method: "GET",
        url: "/"
    }, function(res) {
        t.equal(res.statusCode,200);
        t.end();
    });
});
