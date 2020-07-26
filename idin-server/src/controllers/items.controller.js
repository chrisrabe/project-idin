const database = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const { ITEMS } = require('../_util/constants');
const validation = require('../_util/api.validation');

exports.getItemsList = async () => {
	const db = await database.getInstance();
	const query = {
		itemName: {
			'$regex': '.*'
		}
	};
	const response = await db.find(query);
	const items = JSON.parse(response.data);
	if (items.length < ITEMS.length) {
		// auto generate missing items
		const missingItems = ITEMS.filter(item => !items.includes(item));
		for (const item of missingItems) {
			item.isGenerated = true;
			await db.create(item);
			items.push(item);
		}
	}
	return items;
};

exports.createItem = async (itemName, description) => {
	const db = await database.getInstance();
	// do not create if it already exists
	const items = await db.find({ itemName });
	const result = JSON.parse(items.data);
	if (result.length > 0) {
		throw new AppError(errorType.badRequest.unknown, 'Item already exists');
	}
	// create new item
	const newData = {
		itemName,
		description,
		isGenerated: false
	};
	validation.validateRequiredFields(newData, ['itemName']);
	// create the item
	return db.create(newData);
};

exports.updateItem = async (itemId, itemName, description) => {
	const db = await database.getInstance();
	// ensure that we're not updating item to existing one
	const items = await db.find({ itemName });
	const result = JSON.parse(items.data);
	if (result.length > 0 && result.findIndex(item => item.id !== itemId) !== -1) {
		throw new AppError(errorType.badRequest.unknown, 'Item already exists');
	}
	// check that we're not trying to update generated items
	const {data} = await db.find({id: itemId});
	const curItem = JSON.parse(data);
	if (curItem[0].isGenerated) {
		throw new AppError(errorType.badRequest.unknown, 'Cannot edit generated items');
	}
	// update the item
	const newData = {
		itemName,
		description
	};
	validation.validateRequiredFields(newData, ['itemName']);
	return db.update(itemId, newData);
};

exports.deleteItem = async (itemId) => {
	const db = await database.getInstance();
	// ensure that we are not deleting a generated item
	const {data} = await db.find({id: itemId});
	const curItem = JSON.parse(data);
	if (curItem[0].isGenerated) {
		throw new AppError(errorType.badRequest.unknown, 'Cannot delete generated items');
	}
	// delete the item
	return db.deleteById(itemId);
};
