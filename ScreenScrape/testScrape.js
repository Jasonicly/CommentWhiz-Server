// scripts/testScrape.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const scrapeReviews = require('./scrapeReviews');
const serverUrl = 'http://localhost:5000/process_reviews';
const maxComments = 100; // Number of reviews to scrape

// Read the URL from the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err.message);
        return;
    }

//Set the URL to scrape
    let url;
    try {
        const inputData = JSON.parse(data);
        url = inputData.URL; // Expecting {"URL": "https://example.com"}
        if (!url) {
            throw new Error('URL is not specified in the input file.');
        }
    } catch (parseErr) {
        console.error('Error parsing JSON from input file:', parseErr.message);
        return;
    }

    console.log(`Using URL: ${url} for scraping.`);

    // Scrape the reviews from the URL
    scrapeReviews(url, maxComments).then(reviews => {
        // Write reviews to Scrape_Output.json
        fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2));
        console.log(`Reviews saved to ${outputPath}`);

        // Prepare the form data
        const formData = new FormData();
        formData.append('file', fs.createReadStream(outputPath), 'Scrape_Output.json');

        // Send the JSON data to the AI server as a file part
        axios.post(serverUrl, formData, {
            headers: {
                ...formData.getHeaders()
            }
        })
        .then(response => {
            console.log('AI server response received.');
            const aiAnalysis = response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
            } else if (error.request) {
                console.error('No response from server:', error.request);
            } else {
                console.error('Error in request setup:', error.message);
            }
        });
    }).catch(error => {
        console.error('Error scraping reviews:', error.message);
    });
});
