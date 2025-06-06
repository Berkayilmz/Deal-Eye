const express = require('express');
const router = express.Router();
const { predictPriceTrend } = require('../controllers/predictController');

router.post('/price', predictPriceTrend);

module.exports = router;