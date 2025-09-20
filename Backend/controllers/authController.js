const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '7d';

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email already used' });

    const passwordHash = await bcrypt.hash(password, 10);
    user = new User({ name, email, passwordHash, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
