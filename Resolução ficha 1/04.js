const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    const { method, url } = req;
    console.log(`Received ${method} request for ${url}`);

    if (method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    let body = '';
    switch (url) {
        case '/':
            body = 'Welcome to my server!';
            break;
        case '/about':
            body = 'This is a Node.js server';
            break;
        case '/time':
            body = new Date().toLocaleString();
            break;
        default:
            body = 'Route not found';
            break;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(body);
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});