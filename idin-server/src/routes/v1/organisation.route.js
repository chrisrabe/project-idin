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
        supportEmail,
        isSupplier,
        userId
    } = req.body;
    try {
        const data = await controller.createOrganisation(name, isSupplier, userId, supportEmail);
        return res.created(data);
    } catch (e) {
        res.handleError(e, req);
    }
}));

router.post('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, isSupplier, supportEmail } = req.body;
    try {
        const { data } = await controller.updateOrganisation(id, name, isSupplier, supportEmail);
        return res.ok({user: data});
    } catch (e) {
        res.handleError(e, req);
    }
}));

module.exports = router;
