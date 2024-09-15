const { User } = require('../models/schemas');

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ auth0Id: req.user.sub });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.role !== role) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: 'Error checking user role' });
    }
  };
};

module.exports = { checkRole };