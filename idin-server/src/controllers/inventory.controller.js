const { getDatabaseInstance, getObjectById } = require('../_util/database');
const validation = require('../_util/api.validation');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const { TRANSACTION_TYPE, TRANSACTION_STATUS } = require('../_util/constants');

const transactionController = require('./transaction.controller');

exports.getInventoryList = async (orgId) => {
    const db = await getDatabaseInstance();
    const queryReq = await db.find({ owner: orgId });
    return JSON.parse(queryReq.data);
};

exports.createInventory = async (itemId, amount, unitType, owner) => {
    const db = await getDatabaseInstance();
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

exports.updateInventory = async (id, amount, userId) => {
    const db = await getDatabaseInstance();
    const curInventory = await getObjectById(db, id);
    const curUser = await getObjectById(db, userId);
    const newData = {
        amount
    };
    validation.validateRequiredFields(newData, Object.keys(newData));
    const response = amount <= 0 ? await db.deleteById(id) : await db.update(id, newData);
    // record transaction
    const transType = amount < curInventory.amount ? TRANSACTION_TYPE.remove : TRANSACTION_TYPE.add;
    const newAmount = amount < 0 ? 0 : amount;
    const amountChange = Math.abs(newAmount - curInventory.amount);
    // create transaction
    await transactionController.createTransaction(
        curInventory.itemId, // item id
        amountChange, // amount
        curInventory.unitType, // unit type
        userId, // executedBy
        curUser.organisationId, // origin and destination same because user is doing changes
        curUser.organisationId,
        transType,
        TRANSACTION_STATUS.completed // automatically complete
    );
    return response;
};

