const database = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');

exports.getAllOrganisation = async () => {
	const db = await database.getInstance();
	const query = {
		orgName: {
			'$regex': '.*'
		}
	};
	const response = await db.find(query);
	return JSON.parse(response.data);
};

exports.createOrganisation = async (name, isSupplier, userId, supportEmail) => {
	const db = await database.getInstance();
	// ensure that organisation name does not exist yet
	const orgNameRes = await db.find({ orgName: name });
	const result = JSON.parse(orgNameRes.data);
	if (result.length > 0) {
		throw new AppError(errorType.badRequest.unknown, 'Organisation already exists');
	}
	// find user with id
	const user = await db.find({ '_id': userId });
	const userData = JSON.parse(user.data)[0];
	// create the organisation
	const data = {
		orgName: name,
		isSupplier,
		supportEmail: supportEmail || userData.email
	};
	validation.validateRequiredFields(data, Object.keys(data));
	const newOrg = await db.create(data);
	// update the user in the database
	const { id } = newOrg.data;
	userData.organisationId = id;
	await db.update(userId, userData);
	return newOrg;
};

exports.updateOrganisation = async (id, name, isSupplier, supportEmail) => {
	const db = await database.getInstance();
	// ensure that organisation name is not taken
	const orgNameRes = await db.find({ orgName: name });
	const result = JSON.parse(orgNameRes.data);
	if (result.length > 0 && result.findIndex(item => item.id !== id) !== -1) {
		throw new AppError(errorType.badRequest.unknown, 'Organisation already exists');
	}
	// update organisation details
	const data = {
		orgName: name,
		isSupplier,
		supportEmail
	};
	validation.validateRequiredFields(data, Object.keys(data));
	return db.update(id, data);
};
