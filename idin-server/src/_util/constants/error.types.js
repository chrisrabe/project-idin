const ERROR_TYPES = {
	badRequest: {
		unknown: 'badRequest',
		missingField: 'missingField',
		incorrectValue: 'incorrectValue',
		cannotBeInFuture: 'cannotBeInFuture',
		cannotBeDeleted: 'cannotBeDeleted',
	},
	unauthorised: {
		wrongCredentials: 'wrongCredentials',
		invalidToken: 'invalidToken',
		missingToken: 'missingToken',
	},
	forbidden: {
		forbidden: 'forbidden',
		noClearance: 'noClearance',
		noWritePrivilege: 'noWritePrivilege',
		cannotAccessStore: 'cannotAccessStore',
	},
	notFound: 'notFound',
	internalServerError: 'internalServerError',
};

module.exports = ERROR_TYPES;
