'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mongodbStore = require('connect-mongo')(session);
const app = express();
const path = require('path');
const router = require('./routes');

const config = require('../config');

const PORT = require('../config').port;
const port = process.env.PORT || PORT;

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.collection}`);
const db = mongoose.connection;
db.on('error', function (err) {
    console.error('MongoDB: There was a db connection error');
    return  console.error(err.message);
});
db.once('connected', function () {
    return console.log('MongoDB: Successfully connected to ');
});
db.once('disconnected', function () {
    return console.error('MongoDB: Successfully disconnected');
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers, X-Requested-With, Origin,Accept");
    //", " +
    // ", , , , " +
    // ", ");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    name: 'xpressBlu.sess',
    store: new mongodbStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600
    }),
    secret: 'qwertyuiop123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 15}
}));

app.use('/', router);

app.listen(port);

module.exports = app;
