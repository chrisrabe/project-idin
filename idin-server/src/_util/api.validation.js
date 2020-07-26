const AppError = require('./api.error');
const errorType = require('./constants/error.types');

exports.validateRequiredFields = (data, requiredFields = []) => {
    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            throw new AppError(errorType.badRequest.missingField, field);
        }
    }
}
