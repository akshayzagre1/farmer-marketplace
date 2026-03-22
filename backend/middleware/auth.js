const jwt = require('jsonwebtoken');

// Protect routes by validating JWT token from Authorization header.
const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Role checker for farmer/buyer specific APIs.
const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: `Only ${role}s can perform this action` });
  }

  next();
};

module.exports = { auth, requireRole };
