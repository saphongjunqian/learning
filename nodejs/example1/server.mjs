import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

// Start a simple http server locally on port 3000
server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});

// Run with: node --experimental-modules server.mjs
