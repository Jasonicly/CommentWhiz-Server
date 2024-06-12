var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const app = express();
const saltRounds = 10; // Number of salt rounds for bcrypt

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/application_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    var _id = req.body._id;
    var password = req.body.password_hash;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            console.log("Error hashing password:", err);
            return res.status(500).send("Internal server error");
        }

        var data = {
            _id: _id,
            "password_hash": hash
        };

        db.collection('users').insertOne(data, (err, collection) => {
            if (err) {
                console.log("Error inserting data:", err);
                return res.status(500).send("Error inserting data");
            }
            console.log("Record Inserted Successfully");
        });

        return res.redirect('signup_success.html');
    });
});

app.get("/user_data", (req, res) => {
    db.collection('users').find({}).toArray((err, users) => {
        if (err) {
            console.log("Error fetching data:", err);
            return res.status(500).send("Internal server error");
        }
        res.json(users);
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('register.html');
}).listen(3000);

console.log("Listening on PORT 3000");