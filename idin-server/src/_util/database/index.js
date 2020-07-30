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
	const retrieved = {};
	for (const key of additional) {
		if (key === ADDITIONAL_FIELDS.user) {
			fieldsToRetrieve.push({
				email: {
					'$regex': '.*'
				}
			});
			retrieved.user = true;
		} else if (key === ADDITIONAL_FIELDS.item) {
			fieldsToRetrieve.push({
				itemName: {
					'$regex': '.*'
				}
			});
			retrieved.item = true;
		} else if (key === ADDITIONAL_FIELDS.organisation) {
			fieldsToRetrieve.push({
				orgName: {
					'$regex': '.*'
				}
			});
			retrieved.organisation = true;
		} else if (key === ADDITIONAL_FIELDS.transactions) {
			fieldsToRetrieve.push({
				origin: {
					'$regex': '.*'
				},
			});
			retrieved.transactions = true;
		} else if (key === ADDITIONAL_FIELDS.inventory) {
			fieldsToRetrieve.push({
				owner: {
					'$regex': '.*'
				}
			});
			retrieved.inventory = true;
		} else if (key === ADDITIONAL_FIELDS.requests) {
			fieldsToRetrieve.push({
				reqOrigin: {
					'$regex': '.*'
				},
			});
			retrieved.requests = true;
		}
	}
	const query = {
		'$or': fieldsToRetrieve
	};
	const users = [];
	const organisations = [];
	const items = [];
	const transactions = [];
	const inventory = [];
	const requests = [];
	const reqData = [];
	const { data } = await db.find(query);
	const result = JSON.parse(data);
	for (const res of result) {
		if (retrieved.user && res.email !== undefined) {
			users.push(res);
		} else if (retrieved.organisation && res.orgName !== undefined) {
			organisations.push(res);
		} else if (retrieved.item && res.itemName !== undefined) {
			items.push(res);
		} else if (retrieved.transactions && res.origin !== undefined) {
			transactions.push(res);
		} else if (retrieved.inventory && res.owner !== undefined) {
			inventory.push(res);
		} else if (retrieved.requests && res.reqOrigin !== undefined) {
			requests.push(res);
		} else {
			reqData.push(res);
		}
	}
	return {
		data: reqData,
		users,
		organisations,
		items,
		transactions,
		inventory,
		requests
	};
}

module.exports = {
	connect: getDbConnection,
	getDatabaseInstance: getInstance,
	getObjectById,
	getObjectByQuery,
	getDataWithAdditionalFields
};
