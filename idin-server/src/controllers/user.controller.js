const { getDatabaseInstance, getObjectById } = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const validation = require('../_util/api.validation');
const { USER_ROLES } = require('../_util/constants');

exports.getUserList = async () => {
	const db = await getDatabaseInstance();
	const query = {
		email: {
			'$regex': '.*'
		}
	};
	const response = await db.find(query);
	return JSON.parse(response.data);
};

exports.getUser = async (id) => {
	const db = await getDatabaseInstance();
	return getObjectById(db, id);
};

exports.updateUser = async (id, email, organisationId) => {
	const db = await getDatabaseInstance();
	const newData = {
		email,
		organisationId
	};
	const result = await db.find({email});
	if (result.length > 0 && result.findIndex(item => item.id !== id) !== -1) {
		// throw error if email taken by another user
		throw new AppError(errorType.badRequest.unknown, 'Email already exist');
	}
	validation.validateRequiredFields(newData, Object.keys(newData));
	return db.update(id, newData);
};

exports.createUser = async (username, email) => {
	const db = await getDatabaseInstance();
	const data = {
		username,
		email,
		organisationId: '',
		role: USER_ROLES.admin
	};
	// ensure that email is unique
	const result = await db.find({email});
	if (result.length > 0) {
		throw new AppError(errorType.badRequest.unknown, 'Email already exists');
	}
	// ensure that username is unique
	const queryRes = await db.find({username});
	const usernames = JSON.parse(queryRes.data);
	if (usernames.length > 0) {
		throw new AppError(errorType.badRequest.unknown, 'Username already exists');
	}
	validation.validateRequiredFields(data, ['username', 'email', 'role']);
	// create the user document
	return db.create(data);
};
