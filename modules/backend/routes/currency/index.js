const express = require('express');
const router = express.Router();
const controller = require('./controller.currency');
const totalcurr = require('./totalcurrency')

router.get('/', totalcurr.totalcurrency)

router.get('/convert', controller.convertCurrency);

module.exports = router;

