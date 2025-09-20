// controllers/parentalController.js
const GameplayEvent = require('../models/GameplayEvent');
const Quest = require('../models/Quest');

exports.insightsForChild = async (req,res) => {
  const childId = req.params.childId;
  // Summaries: counts, recent high emotions etc. For demo, simple stats:
  const events = await GameplayEvent.find({ player: childId }).sort({ timestamp: -1 }).limit(200);
  // quick stats:
  const total = events.length;
  const sampleEmotions = events.map(e => e.payload?.detectedEmotion).filter(Boolean);
  const emotionCounts = sampleEmotions.reduce((acc, em) => { acc[em] = (acc[em]||0)+1; return acc; }, {});
  const openQuests = await Quest.find({ player: childId, status: 'open' });
  res.json({ totalEvents: total, emotionCounts, openQuestsCount: openQuests.length });
};
