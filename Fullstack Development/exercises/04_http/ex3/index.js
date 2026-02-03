var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    //console.log(req.headers);
    var headers = req.headers;
    var headersString = JSON.stringify(headers);
    res.write(headersString);
    res.end();
});

server.listen(3000, '127.0.0.1');
//console.log("I am listening to port 3000");