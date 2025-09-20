const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: String,
  description: String,
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  dueDate: Date,
  rewardPoints: { type: Number, default: 10 },
  metadata: Object,
  status: { type: String, enum: ['open','completed','expired'], default: 'open' }
});

module.exports = mongoose.model('Quest', QuestSchema);
