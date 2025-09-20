const mongoose = require('mongoose');

const MarketplaceItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  pricePoints: Number,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // could be system
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  safeForKids: { type: Boolean, default: true }
});

module.exports = mongoose.model('MarketplaceItem', MarketplaceItemSchema);
