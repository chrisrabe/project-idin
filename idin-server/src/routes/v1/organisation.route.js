const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/organisation.controller');

router.get('/', asyncHandler(async (req, res) => {
    try {
        const organisations = await controller.getAllOrganisation();
        return res.ok({organisations});
    } catch (e) {
        res.handleError(e, req);
    }
}));

router.post('/', asyncHandler(async (req, res) => {
    const {
        name,
        isSupplier,
        userId
    } = req.body;
    try {
        const data = await controller.createOrganisation(name, isSupplier, userId);
        return res.created(data);
    } catch (e) {
        res.handleError(e, req);
    }
}));

module.exports = router;
