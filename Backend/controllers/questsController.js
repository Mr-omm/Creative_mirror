const Quest = require('../models/Quest');
const analysis = require('../services/analysisService');

exports.generateFromEvent = async (req, res) => {
  // Accept event ID or payload and produce one or more quests
  const { player, seedText, event } = req.body;
  // For demo: simple quest
  const title = seedText || 'Creative Challenge';
  const q = new Quest({
    title,
    description: 'Use your gameplay as inspiration: make something creative for 30 minutes!',
    player,
    dueDate: new Date(Date.now() + 1000*60*60*24*3),
    rewardPoints: 20
  });
  await q.save();
  res.status(201).json({ quest: q });
};

exports.listForPlayer = async (req,res) => {
  const player = req.params.playerId;
  const quests = await Quest.find({ player }).sort({ createdAt: -1 });
  res.json({ quests });
};

exports.completeQuest = async (req,res) => {
  const id = req.params.questId;
  const quest = await Quest.findById(id);
  if (!quest) return res.status(404).json({ msg: 'Not found' });
  quest.status = 'completed';
  await quest.save();
  // add reward points - simple demo:
  const Reward = require('../models/Reward');
  let reward = await Reward.findOne({ player: quest.player });
  if (!reward) {
    reward = new Reward({ player: quest.player, points: 0, history: []});
  }
  reward.points += quest.rewardPoints;
  reward.history.push({ change: quest.rewardPoints, reason: `Completed quest ${quest.title}`});
  await reward.save();
  res.json({ quest, reward });
};
