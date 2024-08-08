const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection URL and database name
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'application_db';

const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://localhost:3001/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection('users');

            const email = profile.emails[0].value;
            let user = await usersCollection.findOne({ _id: email });

            if (!user) {
                user = {
                    _id: email,
                    googleId: profile.id,
                    isVerified: true,
                    favouriteReport: []
                };
                await usersCollection.insertOne(user);
            }

            const payload = { id: user._id, isVerified: user.isVerified, favouriteReport: user.favouriteReport };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

            return done(null, { token });
        } catch (error) {
            return done(error);
        }
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
