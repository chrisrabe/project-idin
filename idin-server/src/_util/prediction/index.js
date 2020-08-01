const {
	TRANSACTION_TYPE,
	TRANSACTION_STATUS,
	DAY_OF_WEEK,
	REQUEST_STATUS,
	REQUEST_TYPE
} = require('../constants');
const moment = require('moment');
const { MIN_DAYS_LEFT } = require('../../_config/app.config');

const setInventoryRates = (inv, transactions, requests, hasPrediction) => {
	// filter transactions
	const removedTrans = [];
	const inTransitTrans = [];
	const outboundRequests = [];
	for (const trans of transactions) {
		if (trans.itemId === inv.itemId) {
			if (trans.origin === inv.owner && trans.type === TRANSACTION_TYPE.remove) {
				removedTrans.push(trans);
			} else if (trans.destination === inv.owner && trans.status === TRANSACTION_STATUS.inTransit) {
				inTransitTrans.push(trans);
			} else if (trans.origin === inv.owner && trans.status === TRANSACTION_STATUS.inTransit) {
				outboundRequests.push(trans);
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
				const transDate = moment(trans.createdAt).startOf('day');
				const day = DAY_OF_WEEK[transDate.weekday() - 1];
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

const hasPendingRequest = (existingReqs, dest, itemId) => {
	if (!existingReqs) {
		return false;
	}
	return existingReqs.filter(req => (
		req.reqDestination === dest
		&& req.itemId === itemId
		&& req.status === REQUEST_STATUS.pending
	)).length > 0;
};

const getInventoryUsageAnalysis = (orgs, inventory, requests, transactions) => {
	const orgData = {}; // data grouped by org
	const lowInventory = []; // inventory that will be empty in less than a month
	for (const inv of inventory) {
		setInventoryRates(inv, transactions, requests, true);
		if (inv.daysLeft < MIN_DAYS_LEFT) {
			lowInventory.push(inv);
		}
		if (orgData[inv.owner]) {
			orgData[inv.owner].inventory.push(inv);
		} else {
			orgData[inv.owner] = {
				inventory: [inv]
			}
		}
	}
	// sort existing requests by organisation
	for (const req of requests) {
		if (orgData[req.reqOrigin]) {
			if (orgData[req.reqOrigin].requests) {
				orgData[req.reqOrigin].requests.push(req);
			} else {
				orgData[req.reqOrigin].requests = [req];
			}
		} else {
			orgData[req.reqOrigin] = {
				requests: [req]
			}
		}
	}
	// place details into organisation
	for (const org of orgs) {
		if (!orgData[org.id]) {
			orgData[org.id] = {
				details: org
			}
		}
	}
	// construct requests
	const reqToSend = [];
	for (const inv of lowInventory) {
		const existingReqs = orgData[inv.owner].requests;
		for (const orgId of Object.keys(orgData)) {
			const newReq = {
				reqOrigin: inv.owner,
				itemId: inv.itemId,
				status: REQUEST_STATUS.pending,
				type: REQUEST_TYPE.auto,
				message: `They need your help! Their inventory can only last ${Math.round(inv.daysLeft)} days. `
			};
			if (orgId !== inv.owner) {
				const reqDestination = orgId;
				// make sure that no pending requests were made for that item
				if (!hasPendingRequest(existingReqs, reqDestination, inv.itemId)) {
					const destOrgData = orgData[reqDestination];
					if (!destOrgData.inventory) {
						continue;
					}
					const destInv = destOrgData.inventory.filter(item => item.itemId === inv.itemId);
					if (destInv.length > 0) {
						const item = destInv[0];
						if (item.consumption === 0) {
							const originConsumption = inv.consumption;
							const newAmount = inv.amount + item.amount;
							const newDaysLeft = Math.round(newAmount / originConsumption);
							const change = newDaysLeft - inv.daysLeft;
							newReq.message += `IDIN has detected that you are not using this item. By donating all your items, you can help them last ${change} more days!`;
							newReq.reqDestination = reqDestination;
							reqToSend.push(newReq);
						} else {
							// base donation is origin consumption so they can last at least 1 more day
							const minDonation = inv.consumption;
							// check if it will affect destination significantly (lower than minimum days threshold multiplied by 2)
							const newDestAmount = item.amount - minDonation;
							const maxNewDestDaysLeft = Math.round(newDestAmount / item.consumption);
							if (maxNewDestDaysLeft >= (MIN_DAYS_LEFT * 2)) {
								// destination has enough to donate, calculate max
								// 1. calculate how much destination can keep to be above min threshold
								const minDestInv = item.consumption * (MIN_DAYS_LEFT * 2);
								// 2. calculate new amount for destination (max donation)
								const maxDonation = item.amount - minDestInv;
								// 3. calculate how this will affect days left for destination
								const maxNewDestAmount = item.amount - maxDonation;
								const minNewDestDaysLeft =  Math.round(maxNewDestAmount / item.consumption);
								// 4. calculate min and max change
								const maxNewAmount = inv.amount + maxDonation;
								const maxNewDaysLeft = Math.round(maxNewAmount / inv.consumption);
								newReq.reqDestination = reqDestination;
								newReq.message += `By donating ${minDonation} to ${maxDonation} items, you can help them last 1 to ${maxNewDaysLeft} more days`
								newReq.message += ` and still have enough to last you ${minNewDestDaysLeft} to ${maxNewDestDaysLeft} days.`;
								reqToSend.push(newReq);
							}
						}
					}
				}
			}
		}
	}
	return reqToSend;
};

module.exports = {
	setInventoryRates,
	getInventoryUsageAnalysis
};
