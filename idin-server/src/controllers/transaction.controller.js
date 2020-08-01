const moment = require('moment');
const { getDatabaseInstance, getObjectById, getObjectByQuery, getDataWithAdditionalFields } = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');
const { TRANSACTION_STATUS, TRANSACTION_TYPE, ADDITIONAL_FIELDS } = require('../_util/constants');
const { getValueFromArrayById } = require('../_util/helper');

const getInventory = async (db, itemId, owner) => {
	return await getObjectByQuery(db,{ owner, itemId });
};

const setLinkedValues = (transaction, users, orgs, items) => {
	const item = getValueFromArrayById(transaction.itemId, items);
	const createdBy = getValueFromArrayById(transaction.createdBy, users);
	const lastUpdatedBy = getValueFromArrayById(transaction.lastUpdatedBy, users);
	const origin = getValueFromArrayById(transaction.origin, orgs);
	const destination = getValueFromArrayById(transaction.destination, orgs);

	transaction.itemName = item ? item.itemName : 'Unknown item';
	transaction.createdByUser = createdBy ? createdBy.username : 'Unknown user';
	transaction.createdByEmail = createdBy ? createdBy.email : 'N/A';
	transaction.lastUpdatedByUser = lastUpdatedBy ? lastUpdatedBy.username : 'Unknown user';
	transaction.lastUpdatedByEmail = lastUpdatedBy ? lastUpdatedBy.email : 'N/A';
	transaction.originCompany = origin ? origin.orgName : 'Unknown company';
	transaction.originSupportEmail = origin ? origin.supportEmail : 'N/A';
	transaction.destCompany = destination ? destination.orgName : 'Unknown company';
	transaction.destSupportEmail = destination ? destination.supportEmail : 'N/A';
};

exports.getTransactionList = async (orgId) => {
	const db = await getDatabaseInstance();
	const query = [{ origin: orgId }, { destination: orgId } ];
	const additionalFields = [ADDITIONAL_FIELDS.item, ADDITIONAL_FIELDS.organisation, ADDITIONAL_FIELDS.user];
	const queryRes = await getDataWithAdditionalFields(db, query, additionalFields);
	const { data, users, items, organisations } = queryRes;
	for (const transaction of data) {
		setLinkedValues(transaction, users, organisations, items);
	}
	return data;
};

exports.getTransactionDetails = async (id) => {
	const db = await getDatabaseInstance();
	const query = [{id}];
	const additionalFields = [ADDITIONAL_FIELDS.item, ADDITIONAL_FIELDS.organisation, ADDITIONAL_FIELDS.user];
	const queryRes = await getDataWithAdditionalFields(db, query, additionalFields);
	const { data, users, items, organisations } = queryRes;
	for (const transaction of data) {
		setLinkedValues(transaction, users, organisations, items);
	}
	return data.length > 0 ? data[0] : undefined;
};

exports.createTransaction = async (itemId, amount, unitType, userId, origin, destination, type, status, isPaymentRequired = false, message) => {
	const db = await getDatabaseInstance();
	const dateNow = moment().toISOString();
	const newData = {
		itemId,
		amount,
		unitType,
		createdBy: userId,
		lastUpdatedBy: userId,
		origin,
		destination,
		type,
		createdAt: dateNow,
		lastUpdated: dateNow
	};
	// validation
	validation.validateRequiredFields(newData, Object.keys(newData));
	validation.validateAllowedValues(type, Object.keys(TRANSACTION_TYPE).map(key => TRANSACTION_TYPE[key]));
	newData.message = message;

	const inventory = await getInventory(db, itemId, origin);
	const curUser = await getObjectById(db, userId);

	if (curUser.organisationId === origin && (type === TRANSACTION_TYPE.donate || type === TRANSACTION_TYPE.purchase)) {
		if (inventory.length === 0) {
			throw new AppError(errorType.badRequest.unknown, 'Inventory does not exist in organisation');
		}
		const predictedAmount = inventory[0].amount - amount;
		if (predictedAmount < 0) {
			throw new AppError(errorType.badRequest.unknown, 'Insufficient inventory');
		}
	}
	// determine status
	newData.status = status === undefined ?
		isPaymentRequired ? TRANSACTION_STATUS.awaitingPayment : TRANSACTION_STATUS.pendingDelivery
		: status;
	validation.validateAllowedValues(newData.status, Object.keys(TRANSACTION_STATUS).map(key => TRANSACTION_STATUS[key]));

	return db.create(newData);
};

exports.updateTransaction = async (transId, status, userId, message) => {
	const db = await getDatabaseInstance();
	const dateNow = moment().toISOString();
	const newData = {
		status,
		lastUpdated: dateNow,
		lastUpdatedBy: userId
	};
	// validation
	validation.validateRequiredFields(newData, Object.keys(newData));
	validation.validateAllowedValues(status, Object.keys(TRANSACTION_STATUS).map(key => TRANSACTION_STATUS[key]));
	newData.message = message;

	const curUser = await getObjectById(db, userId);
	const transaction = await getObjectById(db, transId);

	if (transaction.status === TRANSACTION_STATUS.canceled && status !== TRANSACTION_STATUS.canceled) {
		throw new AppError(errorType.badRequest.unknown, 'Cannot update status of canceled transactions');
	}

	if (status === TRANSACTION_STATUS.completed) {
		if (curUser.organisationId !== transaction.destination) {
			throw new AppError(errorType.forbidden.forbidden, 'User is not from destination organisation');
		}
		// add inventory to destination
		const destInventory = await getInventory(db, transaction.itemId, transaction.destination);
		if (destInventory.length === 0) {
			// create new inventory
			const newData = {
				itemId: transaction.itemId,
				amount: transaction.amount,
				unitType: transaction.unitType,
				owner: transaction.destination
			};
			await db.create(newData);
		} else {
			const item = destInventory[0];
			const newAmount = parseInt(item.amount, 10) + parseInt(transaction.amount, 10);
			const newDestInv = { ...item[0], amount: newAmount };
			await db.update(item._id, newDestInv);
		}
	} else if (status === TRANSACTION_STATUS.inTransit) {
		if (curUser.organisationId !== transaction.origin) {
			throw new AppError(errorType.forbidden.forbidden, 'User is not from origin organisation');
		}
		// remove inventory from origin
		const originInventory = await getInventory(db, transaction.itemId, transaction.origin);
		if (originInventory.length === 0) {
			newData.status = TRANSACTION_STATUS.canceled;
			newData.message = 'Insufficient inventory to complete transaction';
			await db.update(transId, newData);
			throw new AppError(errorType.badRequest.unknown, 'Insufficient inventory to complete transaction');
		}
		const newOriginInv = { ...originInventory[0], amount: originInventory[0].amount - transaction.amount };
		await db.update(originInventory[0]._id, newOriginInv);
	} else if (status === TRANSACTION_STATUS.awaitingPayment) {
		if (curUser.organisationId !== transaction.origin) {
			throw new AppError(errorType.forbidden.forbidden, 'User is not from origin organisation');
		}
	} else if (status === TRANSACTION_STATUS.canceled) {
		if (transaction.status === TRANSACTION_STATUS.inTransit) {
			throw new AppError(errorType.forbidden.forbidden, 'In transit transactions cannot be cancelled');
		}
	}
	return db.update(transId, newData);
};
