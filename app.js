require('dotenv').config();
const express = require("express");
const path = require('path');
const Promise = require('bluebird');
const bodyParser = require('body-parser')

const app = express();

/** Connect db */
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.Promise = Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/** Front end settings */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

/** Back end: Define routers */
const mainRoute = require('./routes/mainRoute');
app.use('/', mainRoute);


module.exports = app;