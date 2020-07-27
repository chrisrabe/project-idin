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
	const result = JSON.parse(data);
	return result.length === 1 ? result[0] : undefined;
}

async function getObjectByQuery(db, query) {
	const { data } = await db.find(query);
	return JSON.parse(data);
}

module.exports = {
	connect: getDbConnection,
	getDatabaseInstance: getInstance,
	getObjectById,
	getObjectByQuery
};
