const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/user.controller');

router.get('/', asyncHandler(async(req, res) => {
	await controller.getDbInstance();
	return res.noContent();
}));

module.exports = router;
