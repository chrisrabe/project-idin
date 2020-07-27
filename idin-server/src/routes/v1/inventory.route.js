const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/inventory.controller');

// get all inventory associated with the organisation
router.get('/', asyncHandler(async(req, res) => {
	const { orgId } = req.query;
	try {
		const inventory = await controller.getInventoryList(orgId);
		return res.ok({inventory});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// add new inventory
router.post('/', asyncHandler(async (req, res) => {
	const { itemId, amount, unitType, owner, userId } = req.body;
	try {
		const data = await controller.createInventory(itemId, amount, unitType, owner, userId);
		return res.created(data);
	} catch (e) {
		res.handleError(e, req);
	}
}));

// update inventory
router.post('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { amount, userId } = req.body;
	try {
		const {data} = await controller.updateInventory(id, amount, userId);
		return res.ok({item: data});
	} catch (e) {
		res.handleError(e, req);
	}
}));

module.exports = router;
