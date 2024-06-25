// Import required modules
const express = require('express'); // Web framework for Node.js
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const axios = require('axios'); // Promise-based HTTP client for making requests
const WebSocket = require('ws'); // WebSocket library for real-time communication
const fs = require('fs'); // File system module for reading files
const path = require('path'); // Path module for working with file paths
const https = require('https'); // HTTPS module for creating secure servers


// SSL options
const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    secureProtocol: 'TLSv1_2_method', // Ensure at least TLS 1.2
  };


// Create an Express application
const app = express();
// Define the port number the server will listen on
const port = 3001;

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());
// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Define a POST route for scraping
app.post('/scrape', async (req, res) => {
    // Extract the URL from the request body
    const { url } = req.body;
    console.log('recieved url from Extension:', url);
    // Check if URL is provided, if not, send a 400 Bad Request response
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // Forward the URL to another service running on localhost:6000
        const response = await axios.post('https://localhost:6000/scrape', { url }, {
            httpsAgent: new https.Agent({
              rejectUnauthorized: false, // This will allow self-signed certificates (Without this line, YOU WILL GET a certificate error!!!!!!)
            }),
          });
        // Send the response data back to the client
        res.send(response.data);
    } catch (error) {
        // Log the error message to the console
        console.error('Error forwarding the URL:', error.message);
        // Send a 500 Internal Server Error response
        res.status(500).send('Error forwarding the URL');
    }
});

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Handle WebSocket connection
wss.on('connection', ws => {
    console.log('Client connected');

    // Log when a client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Define a POST route for AI processing
app.post('/ai', async (req, res) => {
    // Extract reviews data from the request body
    const reviews = req.body;

    try {
        // Dynamically import the 'open' module
        const open = await import('open').then(mod => mod.default);

        // Open the URL in the default browser before processing
        await open('https://localhost:3000/report');

        // Forward the reviews to AI server on localhost:5000
        const response = await axios.post('https://localhost:5000/process_reviews', reviews, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false, // This will allow self-signed certificates
            }),
        });
        console.log('Response from AI:', response.data);

        // Broadcast response to all connected WebSocket clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response.data));
            }
        });

        // Send the AI response back to the client
        res.status(response.status).send(response.data);
    } catch (error) {
        // Log the error message to the console
        console.error('Error forwarding the reviews:', error.message);
        if (error.response) {
            // Log and send specific error response if available
            console.error('Response data:', error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else {
            // Send a generic 500 Internal Server Error response
            res.status(500).send('An error occurred while forwarding the reviews');
        }
    }
});

// Start the Express server with HTTPS
https.createServer(options, app).listen(port, () => {
    console.log(`Server.js running on https://localhost:${port}`);
  });