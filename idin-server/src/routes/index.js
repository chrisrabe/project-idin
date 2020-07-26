const express = require('express');
const router = express.Router();

const v1Endpoints = require('./v1');

router.use('/v1', v1Endpoints);

module.exports = router;
