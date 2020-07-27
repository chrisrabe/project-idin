const { getDatabaseInstance } = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');
const { TRANSACTION_STATUS, TRANSACTION_TYPE } = require('../_util/constants');

exports.getTransactionList = async (orgId) => {

}

exports.createTransaction = async (itemId, amount, unitType, executedBy, origin, destination, type, status, isPaymentRequired = false) => {
    const db = await getDatabaseInstance();
    const newData = {
        itemId,
        amount,
        unitType,
        executedBy,
        origin,
        destination,
        type,
    }
    // validation
    validation.validateRequiredFields(newData, Object.keys(newData));
    validation.validateAllowedValues(type, Object.keys(TRANSACTION_TYPE).map(key => TRANSACTION_TYPE[key]));
    validation.validateAllowedValues(status, Object.keys(TRANSACTION_STATUS).map(key => TRANSACTION_STATUS[key]));
    // determine status
    newData.status = status === undefined ?
        isPaymentRequired ? TRANSACTION_STATUS.awaitingPayment : TRANSACTION_STATUS.pendingDelivery
        : status;
    return db.create(newData);
};
