const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const inventoryRoute = require('./inventory.route');
const organisationRoute = require('./organisation.route');

router.use('/user', userRoute);
router.use('/inventory', inventoryRoute);
router.use('/organisation', organisationRoute);

module.exports = router;
