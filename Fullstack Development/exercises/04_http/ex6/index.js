var http = require('http');
var fs = require('fs');
var path = require('path');

const readFileSendResponse = (fileName, contentType, res) => {
    fs.readFile(path.resolve(fileName), function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write('Requested content not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
      }
      res.end();
    })
  }

http.createServer((req, res) => {
    if(req.url === '/classical' ) {
        readFileSendResponse('homer.html', 'text/html', res);
    } else if (req.url === '/dystopy') {
        readFileSendResponse('bradbury.html', 'text/html', res);
    } else if (req.url === '/') {
        readFileSendResponse('index.html', 'text/html', res);
    } else {
        res.statusCode = 404;
        res.statusMessage = 'Requested content not found';
        res.end();
    }
})
.listen(3000, '127.0.0.1');