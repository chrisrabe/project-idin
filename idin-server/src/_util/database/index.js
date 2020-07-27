const logger = require('../logger');
const CloudantDatabase = require('./cloudant');

function getDbConnection() {
	logger.info('Initialising Cloudant connection... getDbConnection()');
	return new CloudantDatabase();
}

async function getInstance() {
	return await CloudantDatabase.getInstance();
}

async function getObjectById(db, id) {
	const { data } = await db.find({id});
	return JSON.parse(data);
}

module.exports = {
	connect: getDbConnection,
	getDatabaseInstance: getInstance,
	getObjectById
};
