// Import the 'http' module to create a web server
const http = require('http');
// Import the 'fs' module to work with the file system
const fs = require('fs');
// Import the 'path' module to handle and transform file paths
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Define the file path based on the request URL
  // Default to 'index.html' if no specific file is requested
  let filePath = '.' + req.url + '.html';

  // If no file is requested, serve 'index.html'
  if (req.url === '/') {
    filePath = './index.html';
  }

  // Set the content type to HTML
  const contentType = 'text/html';

  // Read the file from the file system
  fs.readFile(filePath, (err, content) => {
    // If an error occurs while reading the file
    if (err) {
      // If the error is 'ENOENT' (file not found), serve '404.html'
      if (err.code === 'ENOENT') {
        fs.readFile('./404.html', (err, content) => {
          // Set the response header to 200 (OK) and the content type to HTML
          res.writeHead(200, { 'Content-Type': contentType });
          // Send the content of '404.html'
          res.end(content, 'utf8');
        });
      } else {
        // If a different error occurs, respond with a 500 status code (server error)
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // If the file is read successfully, respond with the content of the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

// Define the port number to listen for requests
const PORT = 8080;
// Start the server and log a message to the console
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
