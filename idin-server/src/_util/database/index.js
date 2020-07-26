const logger = require('../logger');
const CloudantDatabase = require('./cloudant');

function getDbConnection() {
	logger.info('Initialising Cloudant connection... getDbConnection()');
	return new CloudantDatabase();
}

async function getInstance() {
	return await CloudantDatabase.getInstance();
}

module.exports = {
	connect: getDbConnection,
	getInstance: getInstance,
};
