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
const user_route = require ('./routes/CRUD_users')

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

// app.disable('x-powered-by');

app.use(session({
    name: 'super toto session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: false}
}));

// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     secret: 'keyboard cat'
//   }))

// CORS solving issue
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Routes
app.use('/', register);
app.use('/', login);
app.use('/', user_route);

// Default route
app.use(function (req, res, next) {
    res.status(404).json("Not found");
});

app.listen(config.app.port, () => console.log(`Example app listening at http://localhost:${port}`))