// // scripts/server.js 




//THIS IS FOR TESTING PURPOSES ONLY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());

// app.post('/process_reviews', (req, res) => {
//     const data = req.body;
//     const outputPath = path.join(__dirname, '../example_text_output_input/Received_Scrape_Output.json');

//     fs.writeFile(outputPath, JSON.stringify(data, null, 2), (err) => {
//         if (err) {
//             console.error('Error saving file:', err);
//             return res.status(500).send('Error saving file');
//         }
//         console.log(`File saved to ${outputPath}`);
//         res.send('File received and saved');
//     });
// });