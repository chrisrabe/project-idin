const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/user.controller');

// get all user list
router.get('/', asyncHandler(async (req, res) => {
	try {
		const users = await controller.getUserList();
		return res.ok({users});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// get user by email
router.get('/:email', asyncHandler(async(req, res) => {
	const { email } = req.param;
	try {
		const user = await controller.getUser(email);
		return res.ok({user});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// update user by id
router.post('/:id', asyncHandler(async (req, res) => {
	const { id } = req.param;
	const {
		email,
		organisationId,
		role
	} = req.body;
	try {
		const result = await controller.updateUser(id, email, organisationId, role);
		return res.ok({user: result.data});
	} catch (e) {
		res.handleError(e, req);
	}
}));

// create new user
router.post('/', asyncHandler(async (req, res) => {
	const {
		username,
		email
	} = req.body;

	try {
		const data = await controller.createUser(username, email);
		return res.created(data);
	} catch (e) {
		res.handleError(e, req);
	}
}));

module.exports = router;
