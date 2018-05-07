// "Hello world" server

// like include
var http  = require('http');
var static = require('node-static');
var url = require('url');

var file = new static.Server('./public');
var server = null;
var no = 0;

// like a callback
function handler (request, response) {
    var URL = request.url;

    var pathname = url.parse(request.url).pathname;

    URL = URL.replace("/","");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello!</h1>");
    response.write("<p>You asked for <code>" + URL + "</code></p>");
    response.write(pathname);
    response.end();
    
}


var server = http.createServer(handler);

// fill in YOUR port number!
server.listen("59462");

