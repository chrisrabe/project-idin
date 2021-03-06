const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/transaction.controller');

router.get('/', asyncHandler(async (req, res) => {
	const { orgId } = req.query;
	try {
		const transactions = await controller.getTransactionList(orgId);
		return res.ok({transactions});
	} catch (e) {
		res.handleError(e, req);
	}
}));

router.get('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const transaction = await controller.getTransactionDetails(id);
		return res.ok({transaction});
	} catch (e) {
		res.handleError(e,req);
	}
}));

router.post('/', asyncHandler(async (req, res) => {
	const {
		itemId,
		amount,
		unitType,
		userId,
		origin,
		destination,
		type,
		isPaymentRequired,
		message
	} = req.body;
	try {
		const data = await controller.createTransaction(
			itemId,
			amount,
			unitType,
			userId,
			origin,
			destination,
			type,
			undefined,
			isPaymentRequired,
			message
		);
		return res.created(data);
	} catch (e) {
		res.handleError(e,req);
	}
}));

router.post('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status,  userId, message } = req.body;
	try {
		const { data } = await controller.updateTransaction(id, status, userId, message);
		return res.ok({transaction: data});
	} catch (e) {
		res.handleError(e, req);
	}
}));

module.exports = router;
