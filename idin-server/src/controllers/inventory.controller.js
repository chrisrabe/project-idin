const { getDatabaseInstance, getObjectById } = require('../_util/database');
const validation = require('../_util/api.validation');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const { TRANSACTION_TYPE, TRANSACTION_STATUS } = require('../_util/constants');

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

exports.getInventoryList = async (orgId) => {
	const db = await getDatabaseInstance();
	const queryReq = await db.find({ owner: orgId });
	const inventory = JSON.parse(queryReq.data);
	for (const inv of inventory) {
		const item = await getObjectById(db , inv.itemId);
		inv.name = item ? item.itemName : 'Unknown Item';
		inv.description = item ? item.description : 'No description';
		inv.inTransit = 0; // TODO check transactions
	}
	return inventory;
};

exports.getInventoryDetails = async (id) => {
	const db = await getDatabaseInstance();
	const inventory = await getObjectById(db, id);
	if (inventory) {
		const item = await getObjectById(db, inventory.itemId);
		inventory.name = item ? item.itemName : 'Unknown Item';
		inventory.description = item ? item.description : 'No description';
		inventory.inTransit = 0; // TODO check transactions
	}
	return inventory;
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

