const config = require('config');
const { DEFAULT_APP_NAME } = require('../_util/constants');

const appName = config.has('app') ? config.get('app').name : DEFAULT_APP_NAME;
const minDaysLeft = config.has('app') ? config.get('app').minDaysLeft : 30;

module.exports = {
	APP_NAME: appName,
	MIN_DAYS_LEFT: minDaysLeft // requests raised if inventory duration is lower than this
};
