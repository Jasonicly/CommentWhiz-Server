// scripts/testScrape.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const scrapeReviews = require('./scrapeReviews');

// File where the extension will save the URL to scrape
const inputFilePath = path.join(__dirname, '../example_text_output_input', 'scrape_input.json');
const outputDirectory = path.join(__dirname, '../example_text_output_input');
const outputPath = path.join(outputDirectory, 'Scrape_Output.json');
const serverUrl = 'http://localhost:5000/process_reviews';
const maxComments = 5; // Number of reviews to scrape

// Read the URL from the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err.message);
        return;
    }

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

    scrapeReviews(url, maxComments).then(reviews => {
        // Ensure the output directory exists
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

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

            // Save the AI analysis to AI_analysis.json
            const aiAnalysisPath = path.join(outputDirectory, 'AI_analysis.json');
            fs.writeFileSync(aiAnalysisPath, JSON.stringify(aiAnalysis, null, 2));
            console.log(`AI analysis saved to ${aiAnalysisPath}`);

            // Extract overall rating and save it to overall_ratings.json
            if (aiAnalysis.summary && aiAnalysis.summary['Enhanced Rating']) {
                const enhancedRating = aiAnalysis.summary['Enhanced Rating'];
                const overallRatings = { "overall_ratings": enhancedRating };
                const overallRatingsPath = path.join(outputDirectory, 'overall_ratings.json');
                fs.writeFileSync(overallRatingsPath, JSON.stringify(overallRatings, null, 2));
                console.log(`Overall ratings saved to ${overallRatingsPath}`);
            } else {
                console.error('Enhanced Rating not found in the AI analysis.');
            }
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
