const moment = require('moment');
const logger = require('./logger');

const setNoCacheHeaders = (res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
}

/**
 * Register response handlers on the express Response object
 * @param {object} express
 */
const registerResponseHandlers = (express) => {
    /**
     *  Error codes for the client side
     */
    const errorCodes = {
        badRequest: {
            unknown: 0,
            missingField: 1,
            incorrectValue: 2,
            cannotBeInFuture: 3,
            cannotBeDeleted: 4,
        },
        unauthorised: {
            wrongCredentials: 1,
            invalidToken: 2,
            missingToken: 3,
        },
        forbidden: {
            forbidden: 1,
            noClearance: 2,
            noWritePrivilege: 3,
        },
        notFound: 1,
        internalServerError: 0
    };

    /**
     * Sends Success > OK to the client with a json response
     * @param {object} json
     */
    express.response.ok = function (json) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(200);
        this.json(json);
    };

    /**
     * Sends Success > OK to the client with a json response
     * @param {object} json
     */
    express.response.created = function (json) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(201);
        this.json(json);
    };

    /**
     * Sends Success > No Content to the client
     */
    express.response.noContent = function () {
        setNoCacheHeaders(this);
        this.status(204);
        this.send();
    };

    /**
     * Sends Client error > Bad Request with custom messages
     * @param {string} errorMessage
     */
    express.response.badRequest = function (errorMessage) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.unknown,
            errorMessage: errorMessage || 'Bad Request',
        });
    };

    /**
     * Sends Client error > Bad Request with predefined messages for resource that cannot be deleted.
     * @param {string} resourceName
     */
    express.response.cannotBeDeleted = function (resourceName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.cannotBeDeleted,
            errorMessage: `${resourceName} cannot be deleted because it is used by another resource`,
        });
    };

    /**
     * Sends client error > bad request with predefined messages for invalid field
     * @param {string} fieldName
     */
    express.response.incorrectValue = function (fieldName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.incorrectValue,
            errorMessage: `Incorrect value for ${fieldName}`,
        });
    };

    /**
     * Sends client error > Bad Request with predefined messages for date in the future
     * @param {string} fieldName
     */
    express.response.cannotBeInFuture = function (fieldName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.cannotBeInFuture,
            errorMessage: `${fieldName} cannot be in the future`,
        });
    };

    /**
     * Sends client error > Unauthorized with predefined messages for wrong credentials
     */
    express.response.wrongCredentials = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(401);
        this.json({
            errorCode: errorCodes.unauthorised.wrongCredentials,
            errorMessage: 'Wrong credentials',
        });
    };

    /**
     * Sends client error > Unauthorized with predefined messages for invalid token
     */
    express.response.invalidToken = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(401);
        this.json({
            errorCode: errorCodes.unauthorised.invalidToken,
            errorMessage: 'Invalid token',
        });
    };

    /**
     * Sends client error > Unauthorized with predefined messages for missing token
     */
    express.response.missingToken = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(401);
        this.json({
            errorCode: errorCodes.unauthorised.missingToken,
            errorMessage: 'Missing token',
        });
    };

    /**
     * Sends client error > Forbidden with predefined messages
     */
    express.response.missingToken = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(403);
        this.json({
            errorCode: errorCodes.forbidden.forbidden,
            errorMessage: 'Forbidden',
        });
    };

    /**
     * Sends client error > Forbidden with predefined messages for not having clearance
     */
    express.response.noClearance = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(403);
        this.json({
            errorCode: errorCodes.forbidden.noClearance,
            errorMessage: 'You do not have clearance for this action',
        });
    };

    /**
     * Sends client error > Forbidden with predefined messages for not having write privileges
     */
    express.response.noWritePrivilege = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(403);
        this.json({
            errorCode: errorCodes.forbidden.noWritePrivilege,
            errorMessage: 'You do not have write privileges',
        });
    };

    /**
     * Sends client error > not found with predefined messages
     * @param {string} resourceName
     */
    express.response.notFound = function (resourceName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(404);
        this.json({
            errorCode: errorCodes.notFound,
            errorMessage: `${resourceName} not found`,
        });
    };

    /**
     * Sends server error > internal server error with custom messages
     * @param {string} errorMessage
     */
    express.response.internalServerError = function (errorMessage) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(500);
        this.json({
            errorCode: errorCodes.internalServerError,
            errorMessage: errorMessage || 'Internal Server Error'
        });
    };

    /**
     * Accepts an errorType constant and calls the appropriate function with errorContent
     * @param {object} error
     * @param {object} req
     * @property {string} error.errorType Type of error to send. Types can be found in error.types.js
     * @property {string} error.errorContent Varies for each errorType
     * @property {object} error.baseError first error thrown and caught
     */
    express.response.handleError = function (error, req = null) {
        setNoCacheHeaders(this);
        const {errorType, errorContent} = error;
        error.errorTime = new moment();
        if (req) {
            error.req = {};
            if (req.headers) {
                error.req.origin = req.headers.origin || undefined;
                error.req.referer = req.headers.referer || undefined;
                error.req.userAgent = req.headers['user-agent'] || undefined;
            }
            error.req.url = req.url || undefined;
            error.req.originalUrl = req.originalUrl || undefined;
            error.req.body = req.body || undefined;
        }
        logger.error(error);
        if (errorType && this[errorType] && typeof this[errorType] === 'function') {
            this[errorType](errorContent);
        } else {
            this.internalServerError(errorContent);
        }
    };

    /**
     * Sends Success > OK to the client with a plain/text response
     * @param {*} text
     */
    express.response.sendPlainText = function (text) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'text/plain; charset=utf-8');
        this.status(200);
        this.send(text);
    };
};

module.exports = registerResponseHandlers;
