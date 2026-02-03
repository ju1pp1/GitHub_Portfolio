import http from 'http';
import fs from 'fs';
import path from 'path';

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

 const server = http.createServer((request, response) => { 
    if(request.url === '/classical' ) {
        readFileSendResponse('homer.html', 'text/html', response);
    } else if (request.url === '/dystopy') {
        readFileSendResponse('bradbury.html', 'text/html', response);
    } else if (request.url === '/') {
        readFileSendResponse('index.html', 'text/html', response);
    } else {
        response.statusCode = 404;
        response.statusMessage = 'Requested content not found';
        response.end();
    }
});
//.listen(3000, '127.0.0.1');
export default server;
//module.exports = server;