const { TRANSACTION_TYPE, TRANSACTION_STATUS, DAY_OF_WEEK } = require('../constants');
const moment = require('moment');

const setInventoryRates = (inv, transactions, requests, hasPrediction) => {
	// filter transactions
	const removedTrans = [];
	const inTransitTrans = [];
	for (const trans of transactions) {
		if (trans.itemId === inv.itemId) {
			if (trans.origin === inv.owner && trans.type === TRANSACTION_TYPE.remove) {
				removedTrans.push(trans);
			} else if (trans.destination === inv.owner && trans.status === TRANSACTION_STATUS.inTransit) {
				inTransitTrans.push(trans);
			}
		}
	}
	// filter requests
	const outboundRequests = [];
	for (const req of requests) {
		if (req.itemId === inv.itemId) {
			if (req.reqOrigin === inv.owner) {
				outboundRequests.push(req);
			}
		}
	}
	// set in transit and outbound
	inv.inTransit = inTransitTrans.length;
	inv.outgoingReqs = outboundRequests.length;
	// do predictions
	if (hasPrediction) {
		if (removedTrans.length === 0) {
			inv.consumption = 0;
			inv.daysLeft = '∞';
			inv.weeklyUsage = DAY_OF_WEEK.reduce((obj, value) => {
				obj[value] = 0;
				return obj;
			}, {});
		} else {
			let earliestRecord = undefined;
			// add to date buckets
			const dates = {};
			const usage = DAY_OF_WEEK.reduce((obj, value) => {
				obj[value] = 0;
				return obj;
			}, {});
			for (const trans of removedTrans) {
				const transDate = moment(trans.createdAt);
				const day = DAY_OF_WEEK[transDate.weekday()];
				if (earliestRecord === undefined || transDate.isBefore(earliestRecord, 'day')) {
					earliestRecord = transDate;
				}
				const localDate = transDate.format('L');
				if (dates[localDate]) {
					dates[localDate] += trans.amount;
				} else {
					dates[localDate] = trans.amount;
				}
				if (usage[day]) {
					usage[day] += trans.amount;
				} else {
					usage[day] = trans.amount;
				}
			}
			// calculate average daily consumption since earliest record
			let sum = 0;
			for (const key of Object.keys(dates)) {
				const value = dates[key];
				sum += value;
			}
			const daysPast = moment().diff(earliestRecord, 'days') + 1;
			const average = sum / daysPast;
			// calculate number of days inventory will last
			const daysLeft = inv.amount / average;

			inv.consumption = average;
			inv.daysLeft = daysLeft;
			inv.weeklyUsage = usage;
		}
	}
};

module.exports = {
	setInventoryRates
};
