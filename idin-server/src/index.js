const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const registerResponseHandlers = require('./_util/response.handlers');
const corsOptions = require('./_util/cors.options');

// Set up database connection
const database = require('./_util/database');
database.connect();

const app = express();

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
app.use((err, req, res) => {
	return res.badRequest();
});

module.exports = app;
