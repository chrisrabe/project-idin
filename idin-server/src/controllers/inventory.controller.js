const database = require('../_util/database');
const validation = require('../_util/api.validation');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');

exports.getInventoryList = async (orgId) => {
    const db = await database.getInstance();
    const queryReq = await db.find({ owner: orgId });
    return JSON.parse(queryReq.data);
};

exports.createInventory = async (itemId, amount, unitType, owner) => {
    const db = await database.getInstance();
    const queryReq = await db.find({ owner });
    const curInventory = JSON.parse(queryReq.data);
    const existingItems = curInventory.filter(item => item.itemId === itemId)
    // add to existing inventory if already exist
    if (existingItems.length !== 0) {
        const existingItem = existingItems[0]; // safe to assume all inventory items are unique
        existingItem.amount += amount;
        validation.validateRequiredFields(existingItem, Object.keys(existingItem));
        return db.update(existingItem._id, existingItem);
    } else {
        const newItem = {
            itemId,
            amount,
            unitType,
            owner
        }
        validation.validateRequiredFields(newItem, Object.keys(newItem));
        validation.validateAllowedValues(unitType, ['BOXES', 'INDIVIDUAL']);
        if (amount <= 0) {
            throw new AppError(errorType.badRequest.unknown, "Amount equal or greater than zero");
        }
        return db.create(newItem);
    }
};

exports.updateInventory = async (id, amount, unitType) => {
    const db = await database.getInstance();
    // TODO evaluate and record transaction
    const newData = {
        amount,
        unitType
    };
    validation.validateRequiredFields(newData, Object.keys(newData));
    validation.validateAllowedValues(unitType, ['BOXES', 'INDIVIDUAL']);
    if (amount === 0) {
        return db.deleteById(id);
    } else {
        return db.update(id, newData);
    }
};

exports.deleteInventory = async () => {

};

