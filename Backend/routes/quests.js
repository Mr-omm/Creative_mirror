const express = require('express');
const router = express.Router();
const { generateFromEvent, listForPlayer, completeQuest } = require('../controllers/questsController');
const auth = require('../middleware/auth');

router.post('/generate', auth.required, generateFromEvent);
router.get('/player/:playerId', auth.required, listForPlayer);
router.post('/:questId/complete', auth.required, completeQuest);

module.exports = router;
