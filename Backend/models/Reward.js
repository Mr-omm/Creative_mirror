const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: { type: Number, default: 0 },
  history: [{
    change: Number,
    reason: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Reward', RewardSchema);
