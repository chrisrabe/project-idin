const moment = require('moment');
const { getDatabaseInstance, getObjectById, getObjectByQuery } = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');
const { TRANSACTION_STATUS, TRANSACTION_TYPE } = require('../_util/constants');

const getInventory = async (db, itemId, owner) => {
    return await getObjectByQuery(db,{ owner, itemId });
};

exports.getTransactionList = async (orgId) => {

}

exports.createTransaction = async (itemId, amount, unitType, userId, origin, destination, type, status, isPaymentRequired = false) => {
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
    validation.validateAllowedValues(status, Object.keys(TRANSACTION_STATUS).map(key => TRANSACTION_STATUS[key]));

    if (type === TRANSACTION_TYPE.remove) {
        const inventory = getInventory(db, itemId, origin);
        const predictedAmount = inventory.amount - amount;
        if (predictedAmount < 0) {
            throw new AppError(errorType.badRequest.unknown, 'Origin does not have enough inventory to support transaction.');
        }
    }
    // determine status
    newData.status = status === undefined ?
        isPaymentRequired ? TRANSACTION_STATUS.awaitingPayment : TRANSACTION_STATUS.pendingDelivery
        : status;
    return db.create(newData);
};

exports.updateTransaction = async (transId, status, userId) => {
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

    const curUser = getObjectById(db, userId);
    const transaction = await getObjectById(db, transId);

    if (status === TRANSACTION_STATUS.completed) {
        if (curUser.organisationId !== transaction.destination) {
            throw new AppError(errorType.forbidden.forbidden, 'User is not from destination organisation');
        }
        // add inventory to destination
        const destInventory = await getInventory(db, transaction.itemId, transaction.destination);
        const newDestInv = { ...destInventory, amount: destInventory.amount + transaction.amount };
        await db.update(destInventory._id, newDestInv);
    } else if (status === TRANSACTION_STATUS.inTransit) {
        if (curUser.organisationId !== transaction.origin) {
            throw new AppError(errorType.forbidden.forbidden, 'User is not from origin organisation');
        }
        // remove inventory from origin
        const originInventory = await getInventory(db, transaction.itemId, transaction.origin);
        const newOriginInv = { ...originInventory, amount: originInventory.amount + transaction.amount };
        await db.update(originInventory._id, newOriginInv);
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
