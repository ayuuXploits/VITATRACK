const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/calculate', apiController.calculateMetrics);
router.post('/log/food', apiController.logFood);
router.post('/log/weight', apiController.logWeight);
router.post('/log/sleep', apiController.logSleep);

module.exports = router;