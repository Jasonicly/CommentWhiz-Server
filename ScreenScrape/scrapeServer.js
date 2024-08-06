const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const scrapeReviews = require('./scrapeReviews');
const https = require('https');

const options = {
    key: fs.readFileSync('../localhost-key.pem'),
    cert: fs.readFileSync('../localhost.pem'),
};

const app = express();
const port = 6000; // The port for your scraping server
const maxComments = 300; // Set the maximum number of comments to scrape

// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('No URL provided.');
    }

    try {
        console.log(`Received URL: ${url}`);

        // Scrape the reviews from the provided URL
        const reviews = await scrapeReviews(url, maxComments);
        console.log('Scraping completed successfully.');

        // Send the JSON data to the React server on port 3000
        const reactServerUrl = 'https://localhost:3001/ai'; // Specify the correct endpoint for your React server
        console.log(`Sending scraped data to React server at ${reactServerUrl}`);

        const response = await axios.post(reactServerUrl, reviews, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false, // This will allow self-signed certificates (Without this line, YOU WILL GET a certificate error!!!!!!)
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('React server response received.');

        // // Assuming the 'reviews' variable holds the JSON data you want to save
        // const saveDataLocally = (data) => {
        //     const filePath = path.join(__dirname, 'reviews.json');
        //     fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        //         if (err) {
        //             console.error('Error saving the JSON file:', err);
        //         } else {
        //             console.log('JSON file saved successfully.');
        //         }
        //     });
        // };

        // Call the function after receiving the response
        console.log('React server response received.');
        // saveDataLocally(reviews);

        // Respond back to the client that the process is complete
        res.json({
            message: 'Scrape successful and data sent to React server',
            reactResponse: response.data
        });


    } catch (error) {
        console.error('Error scraping reviews:', error.message);
        if (error.response) {
            console.error('React server response error:', error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            console.error('No response from React server:', error.request);
            res.status(500).send('No response from React server.');
        } else {
            console.error('Error in request setup:', error.message);
            res.status(500).send('Error in request setup.');
        }
    }
});

https.createServer(options, app).listen(port, () => {
    console.log(`Scraping server running on port ${port}`);
});
