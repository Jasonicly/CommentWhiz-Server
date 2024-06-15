// scripts/scrapeServer.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const scrapeReviews = require('./scrapeReviews');

const app = express();
const port = 6000; // The port for your scraping server

app.use(bodyParser.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('No URL provided.');
    }

    try {
        console.log(`Received URL: ${url}`);

        // Scrape the reviews from the provided URL
        const reviews = await scrapeReviews(url, 5);
        console.log('Scraping completed successfully.');

        // Save reviews locally
        const outputDirectory = path.join(__dirname, '../example_text_output_input');
        const outputPath = path.join(outputDirectory, 'Scrape_Output.json');

        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2));
        console.log(`Reviews saved to ${outputPath}`);

        // Send the JSON data to the React server on port 3000
        const reactServerUrl = 'http://localhost:3001/ai'; // Specify the correct endpoint for your React server
        console.log(`Sending scraped data to React server at ${reactServerUrl}`);

        const response = await axios.post(reactServerUrl, reviews, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('React server response received.');

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

app.listen(port, () => {
    console.log(`Scraping server running on port ${port}`);
});