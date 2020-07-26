const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/inventory.controller');

// get all inventory associated with the organisation
router.get('/:orgId', asyncHandler(async(req, res) => {
	return res.noContent();
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

}));

// remove inventory
router.delete('/:id', asyncHandler(async (req, res) => {

}));


module.exports = router;
