const logger = require('../logger');
const CloudantDatabase = require('./cloudant');
const { ADDITIONAL_FIELDS } = require('../constants');

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

// Work around for the Lite API rate
async function getDataWithAdditionalFields(db, originalQuery, additional = []) {
	const fieldsToRetrieve = [...originalQuery, ];
	for (const key of additional) {
		if (key === ADDITIONAL_FIELDS.user) {
			fieldsToRetrieve.push({
				email: {
					'$regex': '.*'
				}
			});
		} else if (key === ADDITIONAL_FIELDS.item) {
			fieldsToRetrieve.push({
				itemName: {
					'$regex': '.*'
				}
			});
		} else if (key === ADDITIONAL_FIELDS.organisation) {
			fieldsToRetrieve.push({
				orgName: {
					'$regex': '.*'
				}
			});
		}
	}
	const query = {
		'$or': fieldsToRetrieve
	}
	const users = [];
	const organisations = [];
	const items = [];
	const reqData = [];
	const { data } = await db.find(query);
	const result = JSON.parse(data);
	for (const res of result) {
		if (res.email !== undefined) {
			users.push(res);
		} else if (res.orgName !== undefined) {
			organisations.push(res);
		} else if (res.itemName !== undefined) {
			items.push(res);
		} else {
			reqData.push(res);
		}
	}
	return {
		data: reqData,
		users,
		organisations,
		items
	}
}

module.exports = {
	connect: getDbConnection,
	getDatabaseInstance: getInstance,
	getObjectById,
	getObjectByQuery,
	getDataWithAdditionalFields
};
