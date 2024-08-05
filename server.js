// Import required modules
const express = require('express'); // Web framework for Node.js
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const axios = require('axios'); // Promise-based HTTP client for making requests

const jwt = require('jsonwebtoken'); // JSON Web Token library for creating and verifying tokens
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client for connecting to MongoDB
const bcrypt = require('bcrypt'); // Library for hashing passwords
const passport = require('./passport'); // Import the passport configuration
const fs = require('fs'); // File system module for reading files
const path = require('path'); // Path module for working with file paths
const https = require('https'); // HTTPS module for creating secure servers
const { report } = require('process');
const { decode } = require('punycode');
const { JsonWebTokenError } = require('jsonwebtoken');
const { start } = require('repl');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const http = require('http');
const Mailjet = require('node-mailjet');

require('dotenv').config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

app.use(passport.initialize());

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


//app.post('/api/scrape', async (req, res) => {
//    // Extract the URL from the request body
//    const { url } = req.body;
//    console.log('Received URL from Extension:', url);
//    // Check if URL is provided, if not, send a 400 Bad Request response
//    if (!url) {
//        return res.status(400).send('URL is required');
//    }

//    try {
//        const db = client.db(dbName);
//        const analysesCollection = db.collection('analyses');

//        // Check if a document with the given URL as _id exists
//        const existingDoc = await analysesCollection.findOne({ _id: url });

//        if (existingDoc) return res.send(existingDoc);


//        // Forward the URL to another service running on localhost:6000
//        const response = await axios.post('https://localhost:6000/scrape', { url }, {
//            httpsAgent: new https.Agent({
//                rejectUnauthorized: false, // This will allow self-signed certificates (Without this line, YOU WILL GET a certificate error!!!!!!)
//            }),
//        });
//        // Send the response data back to the client
//        res.send(response.data);
//    } catch (error) {
//        // Log the error message to the console
//        console.error('Error forwarding the URL:', error.message);
//        // Send a 500 Internal Server Error response
//        res.status(500).send('Error forwarding the URL');
//    }
//});

// if user opens report via link  https://localhost:3000/report/https://www.amazon.com/dp/B07VGRJDFY - this route will be called
//      Define a route to get the report for a specific URL separate endpoint in server
// if they press open report on the extension: scan first and store in DB, then open report

//
// if they search in the website
//    reload the page with url they search

// if open via history,,,,

//check if the date is the same
function isSameDate(dateString) {
    // Parse the input date string
    const inputDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Compare year, month, and date
    return inputDate.getFullYear() === currentDate.getFullYear() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getDate() === currentDate.getDate();
}

// Define a POST route to check if report is already in DB
app.post('/checkReport', async (req, res) => {
    const url = req.body.url;
    
    const db = client.db(dbName);
    const analysesCollection = db.collection('analyses');

    // Check if a document with the given URL as _id exists
    const existingDoc = await analysesCollection.findOne({ _id: url });

    if (existingDoc) {
        // Send the latest report and a script to close the tab
        res.status(200).send(existingDoc);
    } else {
        
        res.status(404).send(null);
    }
});

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
            if (isSameDate(existingDoc.summary['Processed Time'])) {
                const Report = existingDoc;
                return res.status(200).send(Report);
            }
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

 // Extract and combine review texts
function combineReviews(reviews) {
    let combinedReviewText = "";
    reviews.forEach(review => {
        combinedReviewText += review.body + ".";
    });

    // Limit combinedReviewText to 5,000,000 characters
    if (combinedReviewText.length > 5000000) {
        combinedReviewText = combinedReviewText.substring(0, 5000000);
    }

    return combinedReviewText;
}

// Define a POST route for short summary for extenstion
app.post('/shortsummary', async (req, res) => {
    // Extract reviews data from the request body
    const reviews = req.body;

    // Extract and combine review texts
    const combinedReviewText = combineReviews(reviews.reviews);

    const shortPrompt = `Generate a 20 words or lesser short summary of ${combinedReviewText}`;


    const shortResult = await model.generateContent(shortPrompt);
    const shortResponse = await shortResult.response;
    const shortText = shortResponse.text();

    console.log('Short Summary:', shortText);
    res.send(shortText);
});



// Define a POST route for AI processing
app.post('/ai', async (req, res) => {
    // Extract reviews data from the request body
    const reviews = req.body;

    try {
        const summaryresponse = await axios.post('https://localhost:3001/shortsummary', reviews, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false, // This will allow self-signed certificates
            }),
        });

        const shortText = summaryresponse.data;

        // Forward the reviews to AI server on localhost:5000
        const response = await axios.post('http://34.136.31.161:5000/process_reviews', reviews, {
        });
        console.log('Response from AI:', response.data);

        // Process the AI response to add the timeline list
        const processedAIResponse = processReviews(JSON.stringify(response.data));

        // Extract and combine review texts
        const combinedReviewText = combineReviews(processedAIResponse.reviews);

        const longPrompt = `Generate a 100 words or lesser summary of ${combinedReviewText}`;

        const longResult = await model.generateContent(longPrompt);
        const longResponse = await longResult.response;
        const longText = await longResponse.text();

        // Define aiSummary if it does not exist
        processedAIResponse.aiSummary = {};

        // Assign the short and long summaries
        processedAIResponse.aiSummary.shortSummary = shortText;
        processedAIResponse.aiSummary.longSummary = longText;

       

        console.log(processedAIResponse);

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

        // Send the final response back to the client
        res.send({
            aiSummary: {
                shortSummary: shortText,
                longSummary: longText
            },
            processedAIResponse
        });

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


const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

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

        const startingReport = []

        // Generate a verification token
        const verificationToken = await bcrypt.hash(email + Date.now().toString(), saltRounds);

        // Send verification email using Mailjet
        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "commentwhiz2@gmail.com",
                            Name: "CommentWhiz"
                        },
                        To: [
                            {
                                Email: email,
                                Name: "CommentWhiz User"
                            }
                        ],
                        Subject: "Verify your email address",
                        TextPart: `Please verify your email by clicking on the following link: https://localhost:${port}/verify-email?token=${verificationToken}&email=${email}`,
                        HTMLPart: `<p>Please verify your email by clicking on the following link: <a href="https://localhost:${port}/verify-email?token=${verificationToken}&email=${email}">Verify Email</a></p>`
                    }
                ]
            });

        request
            .then(async (result) => {
                console.log(result.body);

                // Create a new user document
                const newUser = {
                    _id: email,
                    password_hash,
                    isVerified: false,
                    verificationToken,
                    favouriteReport: startingReport,
                };

                // Insert the new user into the users collection
                await usersCollection.insertOne(newUser);

                // Send back a json web token
                jwt.sign({
                    id: email,
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
                        res.status(201).json({ token });
                    });
            })
            .catch((err) => {
                console.error(err.statusCode);
                res.status(500).send('Error sending verification email');
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
                res.status(200).json({ token });
                });
    } 
}catch (error) {
    // Log the error message to the console
    console.error('Error logging in:', error.message);
    res.status(500).send('An error occurred while logging in');
}
});

const serveHTML = (message) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        .fixed {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
        }
        .popup {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
    </style>
    <script>
        setTimeout(function() {
            window.location.href = 'https://localhost:3000';
        }, 5000);
    </script>
</head>
<body>
    <div class="fixed">
        <div class="popup">
            <h1>${message}</h1>
            <p>You will be redirected shortly...</p>
        </div>
    </div>
</body>
</html>
`;

app.get('/verify-email', async (req, res) => {
    const { token, email } = req.query;

    if (!token || !email) {
        return res.status(400).send(serveHTML('Invalid verification link'));
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Find the user by email and token
        const user = await usersCollection.findOne({ _id: email, verificationToken: token });

        if (!user) {
            return res.status(400).send(serveHTML('Invalid verification link'));
        }

        // Update the user document to set isVerified to true and remove the verification token
        await usersCollection.updateOne(
            { _id: email },
            { $set: { isVerified: true }, $unset: { verificationToken: '' } }
        );

        res.send(serveHTML('Email verified successfully!'));
    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).send(serveHTML('An error occurred while verifying the email'));
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

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided!');
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token');
    }
}

// Route to get user data
app.get('/user/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId;

    if (req.user.id !== userId) {
        return res.status(403).send('Access Denied: You do not have permission to access this resource.');
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ _id: userId }, { projection: { password_hash: 0 } });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).send('Error retrieving user data');
    }
});

// Update user favorite report (add favorite)
app.put('/user/:userId/addFavorite', verifyToken, async (req, res) => {
    const { userId } = req.params;
    const { reportId } = req.body;

    if (req.user.id !== userId) {
        return res.status(403).send('Access Denied: You do not have permission to access this resource.');
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        await usersCollection.updateOne(
            { _id: userId },
            { $addToSet: { favouriteReport: reportId } }
        );

        res.status(200).send('Favorite report added');
    } catch (error) {
        console.error('Error adding favorite report:', error);
        res.status(500).send('Error adding favorite report');
    }
});

// Update user favorite report (remove favorite)
app.put('/user/:userId/removeFavorite', verifyToken, async (req, res) => {
    const { userId } = req.params;
    const { reportId } = req.body;

    if (req.user.id !== userId) {
        return res.status(403).send('Access Denied: You do not have permission to access this resource.');
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        await usersCollection.updateOne(
            { _id: userId },
            { $pull: { favouriteReport: reportId } }
        );

        res.status(200).send('Favorite report removed');
    } catch (error) {
        console.error('Error removing favorite report:', error);
        res.status(500).send('Error removing favorite report');
    }
});

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

app.get('/api/allreports', async (req, res) => {
    const db = client.db(dbName);
    const analysesCollection = db.collection('analyses');

    const { page = 1, limit = 10, search = '', sort = 'Relevance', category = 'All' } = req.query;
    console.log(req.query);

    let query = {};
    if (search) {
        const safeSearch = escapeRegex(search);
        query['summary.Product Name'] = { $regex: safeSearch, $options: 'i' };
    }
    if (category && category !== 'All') {
        query['summary.Category'] = category;
    }

    let options = {};
    if (sort === 'Newest') {
        options = { 'summary.Processed Time': -1 };
    } else if (sort === 'Positivity') {
        options = { 'summary.Enhanced Rating': -1 };
    } else if (sort === 'Negativity') {
        options = { 'summary.Enhanced Rating': 1 };
    }

    try {
        const totalReports = await analysesCollection.countDocuments(query);
        const skip = (page - 1) * limit;
        const analyses = await analysesCollection.find(query)
            .sort(options)
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

        const summaries = analyses.map(analysis => ({
            id: analysis._id,
            enhancedRating: analysis.summary['Enhanced Rating'] || '',
            productName: analysis.summary['Product Name'] || '',
            pictureUrl: analysis.summary['productImageBase64'] || ''
        }));

        res.json({
            reports: summaries,
            totalPages: Math.ceil(totalReports / limit)
        });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get user's favorite reports
app.get('/user/:userId/favoriteReports', verifyToken, async (req, res) => {
    const userId = req.params.userId;

    // Ensure that the userId in the token matches the userId in the URL
    if (req.user.id !== userId) {
        return res.status(403).send('Access Denied: You do not have permission to access this resource.');
    }

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        const analysesCollection = db.collection('analyses');

        // Find the user by email
        const user = await usersCollection.findOne({ _id: userId });

        if (!user || !user.favouriteReport) {
            return res.status(404).send('No favorite reports found for this user');
        }

        // Fetch the favorite reports from the analyses collection
        const favoriteReports = await analysesCollection.find({
            _id: { $in: user.favouriteReport }
        }).toArray();

        res.status(200).send(favoriteReports);
    } catch (error) {
        console.error('Error fetching favorite reports:', error);
        res.status(500).send('An error occurred while fetching favorite reports');
    }
});

// Google authentication route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    res.redirect(`https://localhost:3000?token=${req.user.token}`);
});

// Start the Express server with HTTPS
https.createServer(options, app).listen(port, () => {
    console.log(`Server.js running on https://localhost:${port}`);
});