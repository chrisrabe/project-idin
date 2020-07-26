const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const inventoryRoute = require('./inventory.route');

router.use('/user', userRoute);
router.use('/inventory', inventoryRoute);

module.exports = router;
