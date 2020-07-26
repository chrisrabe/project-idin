const config = require('config');
const { DEFAULT_APP_NAME } = require('../_util/constants');

const appName = config.has('app') ? config.get('app').name : DEFAULT_APP_NAME;

module.exports = {
	APP_NAME: appName
};
