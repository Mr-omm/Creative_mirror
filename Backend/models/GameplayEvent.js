const mongoose = require('mongoose');

const GameplayEventSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true },
  game: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  payload: { type: Object }, // arbitrary gameplay metrics: actions, scores, emotions detected etc.
  processed: { type: Boolean, default: false }
});

module.exports = mongoose.model('GameplayEvent', GameplayEventSchema);
