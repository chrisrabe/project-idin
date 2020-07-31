const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const inventoryRoute = require('./inventory.route');
const organisationRoute = require('./organisation.route');
const itemsRoute = require('./items.route');
const transactionRoute = require('./transaction.route');
const requestsRoute = require('./requests.route');
const predictionRoute = require('./prediction.route');

router.use('/user', userRoute);
router.use('/inventory', inventoryRoute);
router.use('/items', itemsRoute);
router.use('/organisation', organisationRoute);
router.use('/transaction', transactionRoute);
router.use('/requests', requestsRoute);
router.use('/prediction', predictionRoute);

module.exports = router;
