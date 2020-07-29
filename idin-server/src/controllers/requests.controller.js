const { getDatabaseInstance, getObjectById, getDataWithAdditionalFields } = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');
const { ADDITIONAL_FIELDS } = require('../_util/constants');
const { getValueFromArrayById } = require('../_util/helper');

const setLinkedValues = (request, items, orgs) => {
	const item = getValueFromArrayById(request.itemId, items);
	const origin = getValueFromArrayById(request.reqOrigin, orgs);
	const destination = getValueFromArrayById(request.reqDestination, orgs);

	request.itemName = item ? item.itemName : 'Unknown item';
	request.originCompany = origin ? origin.orgName : 'Unknown company';
	request.originSupportEmail = origin ? origin.supportEmail : 'N/A';
	request.destCompany = destination ? destination.orgName : 'Unknown company';
	request.destSupportEmail = destination ? destination.supportEmail : 'N/A';
};

exports.getRequestList = async (orgId) => {
	const db = await getDatabaseInstance();
	const query = [ {reqOrigin: orgId}, {reqDestination: orgId} ];
	const additionalFields = [ADDITIONAL_FIELDS.item, ADDITIONAL_FIELDS.organisation];
	const queryRes = await getDataWithAdditionalFields(db, query, additionalFields);
	const { data, items, organisations } = queryRes;
	for (const request of data) {
		setLinkedValues(request, items, organisations);
	}
	return data;
};

exports.getRequestDetails = async (id) => {
    const db = await getDatabaseInstance();
    const query = [{id}];
    const additionalFields = [ADDITIONAL_FIELDS.item, ADDITIONAL_FIELDS.organisation];
    const queryRes = await getDataWithAdditionalFields(db , query, additionalFields);
    const { data, items, organisations } = queryRes;
    for (const request of data) {
        setLinkedValues(request, items, organisations);
    }
    return data.length > 0 ? data[0] : undefined;
};

exports.createRequest = async (reqOrigin, reqDestination, itemId, message, type) => {

};

exports.updateRequest = async (id, message, status, transactionId) => {

};
