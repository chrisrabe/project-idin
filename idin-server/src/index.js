const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const registerResponseHandlers = require('./_util/response.handlers');
const corsOptions = require('./_util/cors.options');
// TODO import cloudant

const app = express();
// TODO connect to cloudant and verify

// middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors(corsOptions));

// register response handlers
registerResponseHandlers(express);

// load routes
const apiRouter = require('./routes');
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// error handler
app.use((err, req, res, next) => {
    return res.badRequest();
});

module.exports = app;
