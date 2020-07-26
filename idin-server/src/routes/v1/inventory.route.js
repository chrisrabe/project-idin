const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// get all inventory associated with the organisation
router.get('/:orgId', asyncHandler(async(req, res) => {
	return res.noContent();
}));

// add new inventory
router.post('/', asyncHandler(async (req, res) => {
	return res.noContent();
}));

// update inventory
router.post('/:id', asyncHandler(async (req, res) => {

}));

// remove inventory
router.delete('/:id', asyncHandler(async (req, res) => {

}));


module.exports = router;
