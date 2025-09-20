const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { insightsForChild } = require('../controllers/parentalController');

router.get('/child/:childId/insights', auth.required, insightsForChild);

module.exports = router;
