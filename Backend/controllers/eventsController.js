// controllers/eventsController.js
const GameplayEvent = require('../models/GameplayEvent');
const analysis = require('../services/analysisService');

exports.ingest = async (req, res) => {
  try {
    const { player, sessionId, game, payload } = req.body;
    if (!player || !sessionId || !game) return res.status(400).json({ msg: 'Missing fields' });

    const ev = new GameplayEvent({ player, sessionId, game, payload });
    await ev.save();

    // Process asynchronously but we'll call analysis placeholder synchronously for demo.
    const result = await analysis.processGameplayEvent(ev); // returns tags/insights/recommendations
    ev.processed = true;
    await ev.save();

    res.status(201).json({ event: ev, analysis: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.listForPlayer = async (req, res) => {
  const playerId = req.params.playerId;
  const events = await GameplayEvent.find({ player: playerId }).sort({ timestamp: -1 }).limit(200);
  res.json({ events });
};
