const express = require('express');
const router = express.Router();
const controller = require('./controller.currency');

router.get('/convert', controller.convertCurrency);

module.exports = router;
