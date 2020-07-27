const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/transaction.controller');

router.get('/:orgId', asyncHandler(async (req, res) => {

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
		isPaymentRequired
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
			isPaymentRequired
		);
		return res.created(data);
	} catch (e) {
		res.handleError(e,req);
	}
}));

router.post('/:id', asyncHandler(async (req, res) => {

}));

module.exports = router;
