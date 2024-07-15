// Import required modules
const express = require('express'); // Web framework for Node.js
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const axios = require('axios'); // Promise-based HTTP client for making requests
const WebSocket = require('ws'); // WebSocket library for real-time communication
const jwt = require('jsonwebtoken'); // JSON Web Token library for creating and verifying tokens
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client for connecting to MongoDB
const bcrypt = require('bcrypt'); // Library for hashing passwords

const fs = require('fs'); // File system module for reading files
const path = require('path'); // Path module for working with file paths
const https = require('https'); // HTTPS module for creating secure servers
const { report } = require('process');
const { decode } = require('punycode');
const { JsonWebTokenError } = require('jsonwebtoken');
const { start } = require('repl');


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

// MongoDB connection URL and database name
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'application_db';

// Create a new MongoClient
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Connect to MongoDB
connectToMongoDB();


// Define a route to check for URL and get the latest report
app.get('/checkDatabase/:url', async (req, res) => {
    const encodedUrl = req.params.url;
    const url = decodeURIComponent(encodedUrl);

    try {
        const db = client.db(dbName);
        const analysesCollection = db.collection('analyses');

        // Check if a document with the given URL as _id exists
        const existingDoc = await analysesCollection.findOne({ _id: url });

        if (existingDoc) {
            // Send the latest report and a script to close the tab
            return res.status(200).send(existingDoc);
        } else {
            // Send a 404 response and a script to close the tab
            return res.status(200).send(null);
        }
    } catch (error) {
        console.error('Error checking the URL:', error.message);

        // Send a 500 response and a script to close the tab
        return res.status(500).send(2);
    }
});


app.post('/api/scrape', async (req, res) => {
    // Extract the URL from the request body
    const { url } = req.body;
    console.log('Received URL from Extension:', url);
    // Check if URL is provided, if not, send a 400 Bad Request response
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const db = client.db(dbName);
        const analysesCollection = db.collection('analyses');

        // Check if a document with the given URL as _id exists
        const existingDoc = await analysesCollection.findOne({ _id: url });

        if (existingDoc) return res.status(200);


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

// if user opens report via link  https://localhost:3000/report/https://www.amazon.com/dp/B07VGRJDFY - this route will be called
//      Define a route to get the report for a specific URL separate endpoint in server 
// if they press open report on the extension: scan first and store in DB, then open report 

// 
// if they search in the website
//    reload the page with url they search

// if open via history,,,,


// Define a POST route for scraping
app.post('/scrape', async (req, res) => {
    // Extract the URL from the request body
    const { url } = req.body;
    console.log('Received URL from Extension:', url);
    // Check if URL is provided, if not, send a 400 Bad Request response
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const db = client.db(dbName);
        const analysesCollection = db.collection('analyses');

        // Check if a document with the given URL as _id exists
        const existingDoc = await analysesCollection.findOne({ _id: url });

        if (existingDoc) {

            const Report = existingDoc;
            return res.status(200).send(Report);

        }

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


// Process review data to calculate monthly average ratings and append this rating history back to the AI response data
function processReviews(data) {
    try {
        const parsedData = JSON.parse(data);
        if (!parsedData || !parsedData.reviews || !Array.isArray(parsedData.reviews)) {
            throw new Error("Invalid reviews data");
        }

        const monthlyRatings = {};

        // Iterate through the reviews
        parsedData.reviews.forEach(review => {
            if (review.time && review['AI-rating'] !== undefined) {
                const date = new Date(review.time);
                if (!isNaN(date)) {
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;

                    const key = `${year}-${month}`;

                    if (!monthlyRatings[key]) {
                        monthlyRatings[key] = {
                            year: year,
                            month: month,
                            totalRating: 0,
                            count: 0
                        };
                    }

                    monthlyRatings[key].totalRating += review['AI-rating'];
                    monthlyRatings[key].count += 1;
                }
            }
        });

        const monthlyRatingsArray = Object.values(monthlyRatings).map(entry => ({
            year: entry.year,
            month: entry.month,
            averageRating: entry.totalRating / entry.count
        }));

        // Sort the array by year and month
        monthlyRatingsArray.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        parsedData.monthlyRatings = monthlyRatingsArray;

        return parsedData;
    } catch (error) {
        console.error('Error processing reviews:', error.message);
        throw error;
    }
}

// Define a POST route for AI processing
app.post('/ai', async (req, res) => {
    // Extract reviews data from the request body
    const reviews = req.body;

    try {
        // Forward the reviews to AI server on localhost:5000
        const response = await axios.post('https://localhost:5000/process_reviews', reviews, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false, // This will allow self-signed certificates
            }),
        });
        console.log('Response from AI:', response.data);

        // Process the AI response to add the timeline list
        const processedAIResponse = processReviews(JSON.stringify(response.data));

        // Store the AI response in MongoDB
        const db = client.db(dbName); // Access the database
        const analysesCollection = db.collection('analyses'); // Select the collection

        const productUrl = processedAIResponse.summary['Product Url']; // Extract the Product Url from the AI response

        // Update or insert the document directly with the new AI response
        await analysesCollection.updateOne(
            { _id: productUrl },
            { $set: processedAIResponse },
            { upsert: true } // Create a new document if it does not exist
        );

        // Send the AI response back to the client
        res.status(response.status).send(processedAIResponse);
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

app.post('/api/databasequery', async (req, res) => {
    const db = client.db(dbName);
    const analysesCollection = db.collection('analyses');

    // Extract all the analyses from the database
    const analyses = await analysesCollection.find().toArray();
    // const analyses = await analysesCollection.find({ count: { $gt: 10 } }).toArray(); // Find analyses with count greater than 10 
    // Map through analyses to only return the summary field
    const summaries = analyses.map(analysis => ({
        summary: analysis.summary
    }));
    res.send(summaries);
});

// Define a POST route for user registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Hash the password
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        
        const  startingReport = {
            favourite: '',
        };
        // Create a new user document
        const newUser = {
            _id: email,
            password_hash,
            isVerified: false,
            favouriteReport: startingReport,
        };

        // Insert the new user into the users collection
        await usersCollection.insertOne(newUser);
        
        // Send back a json web token
        jwt.sign({
            id : email,
            isVerified: false, 
            favouriteReport: startingReport,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({token});
        });
    } catch (error) {
        // Log the error message to the console
        console.error('Error registering user:', error.message);
        res.status(500).send('An error occurred while registering the user');
    }
});


// Define a POST route for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Find the user by email
        const user = await usersCollection.findOne({ _id: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare the password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordCorrect) {
            console.log('Incorrect password');
            return res.status(404).send('Incorrect password');
        }
        else {
            const { _id: id, isVerified, favouriteReport } = user;
            // Send back a json web token
            jwt.sign({
                id,
                isVerified, 
                favouriteReport,
            }, process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }, (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send('Login Successful').json({token});
                });
    } 
}catch (error) {
    // Log the error message to the console
    console.error('Error logging in:', error.message);
    res.status(500).send('An error occurred while logging in');
}
});


// update User Info page 
app.put('/user/:userId', async (req, res) => {
    const {authorization} = req.headers;
    const {userId} = req.params;

    const updates = (({
        favouriteReport,
    }) => ({
        favouriteReport,
    }))(req.body);

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    //Bearer lkj:adfas.adf.asdf
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unable to verify token' });
        }

        const { id } = decoded;

        if (id !== userId) {
            return res.status(403).json({ message: 'No access allowed' });
        }
        const db = client.db(dbName);
        
        const result = await db.collection('users').fineOneAndUpdate(
            { _id: ObjectId(id) }, 
            { $set: { favouriteReport: updates } },
            { returnOriginal: false }
        );

        const { isVerified, favouriteReport } = result.value;

        jwt.sign({
            id,
            isVerified,
            favouriteReport
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        },
        (err, token) => {
            if (err) {
                return res.status(200).send(err);
        }
        res.status(200).json({ token });
    }
    );
    });
});

// Start the Express server with HTTPS
https.createServer(options, app).listen(port, () => {
    console.log(`Server.js running on https://localhost:${port}`);
});