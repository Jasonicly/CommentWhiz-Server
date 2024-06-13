// scripts/testScrape.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const scrapeReviews = require('./scrapeReviews');

const url = 'https://www.amazon.sg/Kleenex-Ultra-Tissue-200ct-packaging/dp/B072DY4R96/ref=cm_cr_arp_d_product_top?ie=UTF8';
const outputDirectory = path.join(__dirname, '../example_text_output_input');
const outputPath = path.join(outputDirectory, 'Scrape_Output.json');
const serverUrl = 'http://localhost:5000/process_reviews';
const maxComments = 5; // Number of reviews to scrape

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
            // Server responded with a status code out of the range of 2xx
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error in request setup:', error.message);
        }
    });
}).catch(error => {
    console.error('Error scraping reviews:', error.message);
});
