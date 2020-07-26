/**
 * @param {string} errorType
 * @param {string} errorContent OPTIONAL
 * @param {object} baseError OPTIONAL
 * @constructor
 */
function AppError (errorType, errorContent = undefined, baseError = null) {
    if (baseError && baseError.constructor === AppError) {
        this.errorContent = baseError.errorContent;
        this.errorType = baseError.errorType;
        this.baseError = baseError.baseError;
    } else {
        this.errorType = errorType;
        this.errorContent = errorContent;
        this.baseError = baseError;
    }
}

module.exports = AppError;
