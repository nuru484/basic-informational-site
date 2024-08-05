const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the About page

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// // Route for the Contact Me page
app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact-me.html'));
});

// Catch-all route to handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
