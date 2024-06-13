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

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', fs.createReadStream(outputPath), 'Scrape_Output.json');

        // Send the JSON data to the actual AI server on port 5000
        const serverUrl = 'http://localhost:5000/process_reviews';
        console.log(`Sending scraped data to AI server at ${serverUrl}`);

        const response = await axios.post(serverUrl, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log('AI server response received.');

        // Save the AI analysis response locally
        const aiAnalysisPath = path.join(outputDirectory, 'AI_analysis.json');
        fs.writeFileSync(aiAnalysisPath, JSON.stringify(response.data, null, 2));
        console.log(`AI analysis saved to ${aiAnalysisPath}`);

        // Extract enhanced rating and create a structured JSON with reviews
        const enhancedRating = response.data.summary['Enhanced Rating'];
        const reviewsWithAI = response.data.reviews.map((review, index) => ({
            "AI-rating": review["AI-rating"],
            "body": review.body,
            "sentiment": review.sentiment,
            "title": review.title
        }));

        const enhancedRatingsData = {
            "reviews": reviewsWithAI,
            "Enhanced Rating": enhancedRating
        };

        const enhancedRatingsPath = path.join(outputDirectory, 'enhanced_Ratings.json');
        fs.writeFileSync(enhancedRatingsPath, JSON.stringify(enhancedRatingsData, null, 2));
        console.log(`Enhanced ratings saved to ${enhancedRatingsPath}`);

        // Send AI_analysis.json to the React server on port 3000
        const reactServerUrl = 'http://localhost:3000/api/ai-analysis'; // Update this path based on your React server endpoint
        console.log(`Sending AI analysis to React server at ${reactServerUrl}`);

        await axios.post(reactServerUrl, response.data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('AI analysis sent to React server.');

        // Send enhanced_Ratings.json back to the browser extension
        res.json({
            message: 'Scrape and AI processing successful',
            enhancedRatings: enhancedRatingsData
        });

    } catch (error) {
        console.error('Error scraping reviews:', error.message);
        if (error.response) {
            console.error('AI server response error:', error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            console.error('No response from AI server:', error.request);
            res.status(500).send('No response from AI server.');
        } else {
            console.error('Error in request setup:', error.message);
            res.status(500).send('Error in request setup.');
        }
    }
});

app.listen(port, () => {
    console.log(`Scraping server running on port ${port}`);
});
