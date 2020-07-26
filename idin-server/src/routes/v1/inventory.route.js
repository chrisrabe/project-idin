const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/inventory.controller');

// get all inventory associated with the organisation
router.get('/:orgId', asyncHandler(async(req, res) => {
	const { orgId } = req.params;
	try {
		const inventory = await controller.getInventoryList(orgId);
		return res.ok({inventory});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// add new inventory
router.post('/', asyncHandler(async (req, res) => {
	const { itemId, amount, unitType, owner } = req.body;
	try {
		const data = await controller.createInventory(itemId, amount, unitType, owner);
		return res.created(data);
	} catch (e) {
		res.handleError(e, req);
	}
}));

// update inventory
router.post('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { amount } = req.body;
	try {
		const {data} = await controller.updateInventory(id, amount);
		return res.ok({item: data});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// remove inventory
router.delete('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		await controller.deleteInventory(id);
		return res.noContent();
	} catch (e) {
		res.handleError(e, req);
	}
}));

module.exports = router;
