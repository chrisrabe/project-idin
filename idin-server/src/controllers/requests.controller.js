const { getDatabaseInstance, getDataWithAdditionalFields, getObjectById } = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');
const { ADDITIONAL_FIELDS, REQUEST_TYPE, REQUEST_STATUS } = require('../_util/constants');
const { getValueFromArrayById } = require('../_util/helper');

const setLinkedValues = (request, items, orgs, users) => {
	const item = getValueFromArrayById(request.itemId, items);
	const origin = getValueFromArrayById(request.reqOrigin, orgs);
	const destination = getValueFromArrayById(request.reqDestination, orgs);

	request.itemName = item ? item.itemName : 'Unknown item';
	request.originCompany = origin ? origin.orgName : 'Unknown company';
	request.originSupportEmail = origin ? origin.supportEmail : 'N/A';
	request.destCompany = destination ? destination.orgName : 'Unknown company';
	request.destSupportEmail = destination ? destination.supportEmail : 'N/A';

	if (request.responderId) {
		const user = getValueFromArrayById(request.responderId, users);
		request.responderUser = user ? user.username : 'Unknown user';
		request.responderEmail = user ? user.email : 'N/A';
	}
};

exports.getRequestList = async (orgId) => {
	const db = await getDatabaseInstance();
	const query = [ {reqOrigin: orgId}, {reqDestination: orgId} ];
	const additionalFields = [ADDITIONAL_FIELDS.item, ADDITIONAL_FIELDS.organisation, ADDITIONAL_FIELDS.user];
	const queryRes = await getDataWithAdditionalFields(db, query, additionalFields);
	const { data, items, organisations, users } = queryRes;
	for (const request of data) {
		setLinkedValues(request, items, organisations, users);
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
	const db = await getDatabaseInstance();
	const newData = {
		reqOrigin,
		reqDestination,
		itemId,
	};
	// validation
	validation.validateRequiredFields(newData, Object.keys(newData));
	if (type) {
		validation.validateAllowedValues(type, Object.keys(REQUEST_TYPE).map(key => REQUEST_TYPE[key]));
	}
	// avoid creating duplicate requests
	const existingReqs = await db.find({ reqOrigin, itemId, reqDestination });
	if (existingReqs.length > 0) {
		throw new AppError(errorType.badRequest.unknown, 'Request already exists');
	}
	// append default values
	newData.message = message;
	newData.type = type ? type : REQUEST_TYPE.manual;
	newData.status = REQUEST_STATUS.pending;
	return db.create(newData);
};

exports.updateRequest = async (id, message, status, transactionId, responderId) => {
	const db = await getDatabaseInstance();
	const newData = {
		status,
		responderId
	};
	// validation
	validation.validateRequiredFields(newData, Object.keys(newData));
	validation.validateAllowedValues(status, Object.keys(REQUEST_STATUS).map(key => REQUEST_STATUS[key]));

	// if status is confirmed, must have a transaction id
	if (status === REQUEST_STATUS.confirmed && !transactionId) {
		throw new AppError(errorType.badRequest.unknown, "Confirmed requests does not have a transaction");
	}

	// transaction id must be valid
	if (status === REQUEST_STATUS.confirmed && transactionId) {
		const transaction = await getObjectById(db, transactionId);
		if (!transaction) {
			throw new AppError(errorType.badRequest.unknown, "Invalid transaction");
		}
	}

	// only responder can update ticket
	const request = await getObjectById(db ,id);
	const user = await getObjectById(db,responderId);

	if (!request) {
		throw new AppError(errorType.badRequest.unknown, "Invalid request");
	}

	if (request.reqDestination !== user.organisationId) {
		throw new AppError(errorType.badRequest.unknown, "Message is not intended for responder");
	}

	if (request.status !== REQUEST_STATUS.pending) {
		throw new AppError(errorType.badRequest.unknown, "Request already resolved");
	}

	if (message) {
		newData.message = message;
	}
	if (transactionId) {
		newData.transactionId = transactionId;
	}
	return db.update(id, newData);
};
