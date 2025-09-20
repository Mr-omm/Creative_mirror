const MarketplaceItem = require('../models/MarketplaceItem');

exports.list = async (req,res) => {
  const items = await MarketplaceItem.find({}).limit(100);
  res.json({ items });
};

exports.create = async (req,res) => {
  const { title, description, pricePoints, tags, safeForKids } = req.body;
  const it = new MarketplaceItem({ title, description, pricePoints, tags, seller: req.user.id, safeForKids });
  await it.save();
  res.status(201).json({ item: it });
};
