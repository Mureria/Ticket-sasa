const User = require('../model/user'); // Import your user model

// Middleware to check user roles
const checkUserRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; 

      const user = await User.findById(userId);

      if (user && roles.includes(user.role)) {

        next();
      } else {
        res.status(403).json({ message: 'You do not have the required permission for this action.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

// Example usage:
// This middleware ensures that only users with the "admin" role can access a particular route
const adminMiddleware = checkUserRole(['admin']);

// This middleware ensures that only users with the "organizer" role can access a particular route
const organizerMiddleware = checkUserRole(['organizer']);

// This middleware ensures that only users with the "user" role can access a particular route
const userMiddleware = checkUserRole(['user']);

module.exports = {userMiddleware, organizerMiddleware,  adminMiddleware};