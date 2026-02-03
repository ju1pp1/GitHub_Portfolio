var http = require('http');

var server = http.createServer(function(req, res) {
    let body = ''; //[]
    
    //Capture data
    req.on('data', function (chunk) {
        body += chunk;
        //body.push(chunk);
    });

    //When all data is received
    req.on('end', function () {
        let reversedBody = body.split('').reverse().join('');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(reversedBody);
        res.end();
        //body = Buffer.concat(body).toString();
    });
});

server.listen(3000, '127.0.0.1');