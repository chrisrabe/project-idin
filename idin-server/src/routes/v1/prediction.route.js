const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../../controllers/prediction.controller');

router.get('/', asyncHandler(async (req, res) => {
    try {
        const { data } = await controller.getPrediction();
        res.created(data);
    } catch (e) {
        res.handleError(e, req);
    }
}));

module.exports = router;
