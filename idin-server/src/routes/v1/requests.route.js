const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/requests.controller');

// Get all requests
router.get('/', asyncHandler(async (req, res) => {
	const { orgId } = req.query;
	try {
		const requests = await controller.getRequestList(orgId);
		return res.ok({requests});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// get request details
router.get('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const request = await controller.getRequestDetails(id);
		return res.ok({request});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// create new request
router.post('/', asyncHandler(async (req, res) => {
	const {
		reqOrigin,
		reqDestination,
		itemId,
		message,
		type
	} = req.body;
	try {
		const data = await controller.createRequest(reqOrigin, reqDestination, itemId, message, type);
		return res.created(data);
	} catch (e) {
		res.handleError(e,req);
	}
}));

// update request
router.post('/:id', asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		message,
		status,
		transactionId,
		responderId
	} = req.body;
	try {
		const { data } = await controller.updateRequest(id, message, status, transactionId, responderId);
		return res.ok({request: data});
	} catch (e) {
		res.handleError(e, req);
	}
}));

module.exports = router;
