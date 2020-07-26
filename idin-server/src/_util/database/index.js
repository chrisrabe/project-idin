const logger = require('../logger');
const CloudantDatabase = require('./cloudant');

function getDbConnection() {
	logger.info('Initialising Cloudant connection... getDbConnection()');
	return new CloudantDatabase();
}

module.exports = {
	connect: getDbConnection,
};
