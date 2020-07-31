const { getDatabaseInstance, getDataWithAdditionalFields } = require('../_util/database');
const { ADDITIONAL_FIELDS } = require('../_util/constants');
const { getInventoryUsageAnalysis } = require('../_util/prediction');

exports.getPrediction = async () => {
    const db = await getDatabaseInstance();
    const query = [];
    const additionalFields = [
        ADDITIONAL_FIELDS.transactions,
        ADDITIONAL_FIELDS.inventory,
        ADDITIONAL_FIELDS.requests,
        ADDITIONAL_FIELDS.organisation
    ];
    const {
        inventory,
        organisations,
        requests,
        transactions
    } = await getDataWithAdditionalFields(db, query, additionalFields);
    const reqToSend = getInventoryUsageAnalysis(organisations, inventory, requests, transactions);
    return db.bulkCreate(reqToSend);
}
