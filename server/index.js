// Packages
const express = require('express');
const session = require('express-session')
// const cookieSession = require('cookie-session')
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Config file
const config = require('./config')

// Routes files
const register = require('./routes/register')
const login = require('./routes/login')

// Main app
const app = express()
const port = config.app.port

// Database connexion
const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middlewares

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     secret: 'keyboard cat'
//   }))

// CORS solving issue
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/', register);
app.use('/', login);


// Default route
app.use(function (req, res, next) {
    res.status(404).json("Not found");
});

app.listen(config.app.port, () => console.log(`Example app listening at http://localhost:${port}`))