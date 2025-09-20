// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.required = (req,res,next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ msg: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

exports.optional = (req,res,next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return next();
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
  } catch (err) {
    // ignore invalid token for optional
  }
  next();
};
