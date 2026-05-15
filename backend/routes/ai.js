const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/coach', aiController.getAICoaching);

module.exports = router;