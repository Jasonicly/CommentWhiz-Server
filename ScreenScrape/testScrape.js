// scripts/testScrape.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const scrapeReviews = require('./scrapeReviews'); 

const url = 'https://www.amazon.sg/Kleenex-Ultra-Tissue-200ct-packaging/dp/B072DY4R96/ref=cm_cr_arp_d_product_top?ie=UTF8';
const outputDirectory = path.join(__dirname, '../example_text_output_input');
const outputPath = path.join(outputDirectory, 'Scrape_Output.json');
const serverUrl = 'http://localhost:5000/process_reviews';

scrapeReviews(url).then(reviews => {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // Write reviews to Scrape_Output.json
    fs.writeFile(outputPath, JSON.stringify(reviews, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log(`Reviews saved to ${outputPath}`);

        // Read the JSON file
        fs.readFile(outputPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Send the JSON data to the server
            axios.post(serverUrl, jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log('Server response:', response.data);
            })
            .catch(error => {
                console.error('Error sending data to server:', error.message);
            });
        });
    });
}).catch(error => {
    console.error('Error scraping reviews:', error.message);
});
