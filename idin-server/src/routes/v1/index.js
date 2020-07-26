const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const inventoryRoute = require('./inventory.route');
const organisationRoute = require('./organisation.route');
const itemsRoute = require('./items.route');

router.use('/user', userRoute);
router.use('/inventory', inventoryRoute);
router.use('/items', itemsRoute);
router.use('/organisation', organisationRoute);

module.exports = router;
