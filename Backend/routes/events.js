const express = require('express');
const router = express.Router();
const { ingest, listForPlayer } = require('../controllers/eventsController');
const auth = require('../middleware/auth');

router.post('/ingest', auth.optional, ingest); // games might send events using API key or token
router.get('/player/:playerId', auth.required, listForPlayer);

module.exports = router;
