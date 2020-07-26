const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/items.controller');

router.get('/', asyncHandler(async (req, res) => {
    try {
        const items = await controller.getItemsList();
        return res.ok({items});
    } catch (e) {
        res.handleError(e, req);
    }
}));

router.post('/', asyncHandler(async (req, res) => {
    return res.noContent();
}));

router.post('/:id', asyncHandler(async (req, res) => {
    return res.noContent();
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    return res.noContent();
}));

module.exports = router;
