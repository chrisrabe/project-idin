const bunyan = require('bunyan');
const config = require('../_config/app.config');

const logger = bunyan.createLogger({
    name: config.APP_NAME,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: process.stdout
        }
    ]
});

module.exports = logger;
