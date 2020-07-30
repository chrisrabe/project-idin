const { getDatabaseInstance, getObjectById, getDataWithAdditionalFields } = require('../_util/database');
const validation = require('../_util/api.validation');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const { TRANSACTION_TYPE, TRANSACTION_STATUS, ADDITIONAL_FIELDS } = require('../_util/constants');
const { setInventoryRates } = require('../_util/prediction');

const transactionController = require('./transaction.controller');

const recordTransaction = async (db, itemId, oldAmount, newAmount, unitType, userId) => {
	const curUser = await getObjectById(db, userId);
	const transType = oldAmount < newAmount ? TRANSACTION_TYPE.add : TRANSACTION_TYPE.remove;
	const amount = newAmount < 0 ? 0 : newAmount;
	const amountChange = Math.abs(amount - oldAmount);
	// create transaction
	await transactionController.createTransaction(
		itemId, // item id
		amountChange, // amount
		unitType, // unit type
		userId, // executedBy
		curUser.organisationId, // origin and destination same because user is doing changes
		curUser.organisationId,
		transType,
		TRANSACTION_STATUS.completed // automatically complete
	);
};

const setLinkedFields = (inv, items, transactions = [], requests = [], hasPrediction = false) => {
	let item = items.filter(item => item.id === inv.itemId);
	if (item.length > 0) {
		item = item[0];
		inv.name = item.itemName;
		inv.description = item.description;
	} else {
		inv.name = 'Unknown Item';
		inv.description = 'No description';
	}
	setInventoryRates(inv, transactions, requests, hasPrediction);
};

exports.getInventoryList = async (orgId) => {
	const db = await getDatabaseInstance();
	const queryRes = await getDataWithAdditionalFields(
		db,
		[{owner: orgId}],
		[ADDITIONAL_FIELDS.item, ADDITIONAL_FIELDS.transactions, ADDITIONAL_FIELDS.requests]
	);
	const inventory = queryRes.data;
	for (const inv of inventory) {
		setLinkedFields(inv, queryRes.items, queryRes.transactions, queryRes.requests);
	}
	return inventory;
};

exports.getInventoryDetails = async (id) => {
	const db = await getDatabaseInstance();
	const query = [{id}];
	const additionalFields = [
		ADDITIONAL_FIELDS.item,
		ADDITIONAL_FIELDS.transactions,
		ADDITIONAL_FIELDS.requests
	];
	const queryRes = await getDataWithAdditionalFields(db, query, additionalFields);
	const inventory = queryRes.data;
	if (inventory.length > 0) {
		setLinkedFields(inventory[0], queryRes.items, queryRes.transactions, queryRes.requests, true);
	}
	return inventory[0];
};

exports.createInventory = async (itemId, amount, unitType, owner, userId) => {
	const db = await getDatabaseInstance();
	const queryReq = await db.find({ owner });
	const curInventory = JSON.parse(queryReq.data);
	const existingItems = curInventory.filter(item => item.itemId === itemId);
	// add to existing inventory if already exist
	if (existingItems.length !== 0) {
		const existingItem = existingItems[0]; // safe to assume all inventory items are unique
		const newData = {...existingItem, amount: existingItem.amount + amount};
		validation.validateRequiredFields(existingItem, Object.keys(newData));
		const result = await db.update(existingItem._id, newData);
		await recordTransaction(
			db,
			itemId,
			existingItem.amount,
			existingItem.amount + amount,
			unitType,
			userId
		);
		return result;
	} else {
		const newItem = {
			itemId,
			amount,
			unitType,
			owner
		};
		validation.validateRequiredFields(newItem, Object.keys(newItem));
		validation.validateAllowedValues(unitType, ['BOXES', 'INDIVIDUAL']);
		if (amount <= 0) {
			throw new AppError(errorType.badRequest.unknown, 'Amount equal or greater than zero');
		}
		const result = await db.create(newItem);
		await recordTransaction(db, itemId, 0, amount, unitType, userId);
		return result;
	}
};

exports.updateInventory = async (id, amount, userId) => {
	const db = await getDatabaseInstance();
	const curInventory = await getObjectById(db, id);
	const newData = {
		amount
	};
	validation.validateRequiredFields(newData, Object.keys(newData));
	const response = amount <= 0 ? await db.deleteById(id) : await db.update(id, newData);
	// record transaction
	await recordTransaction(
		db,
		curInventory.itemId,
		curInventory.amount,
		amount,
		curInventory.unitType,
		userId
	);
	return response;
};

