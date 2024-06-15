// scripts/server.js
const express = require('express');
const app = express();
const port = 6000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Node.js server running on port 6000');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
