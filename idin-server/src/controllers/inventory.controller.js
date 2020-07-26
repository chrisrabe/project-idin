const database = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');

exports.getInventoryList = async (orgId) => {

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
        return db.create(newItem);
    }
};

exports.updateInventory = async () => {

};

exports.deleteInventory = async () => {

};

