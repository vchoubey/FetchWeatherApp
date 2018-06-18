const http = require('http');
const router = require('./router');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(router.handleRequest);

console.log("Listening on http://" + hostname + ":" + port);
server.listen(port, hostname);