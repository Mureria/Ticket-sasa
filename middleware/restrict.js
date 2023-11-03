
const checkAdminRole = (req, res, next) => {
    // Assuming that you have a user object or some way to identify the user's role
    const user = req.body; // Replace this with how you retrieve the user
  
    if ( user.role === 'admin') {
      // The user has 'admin' role, allow access to the route
      next();
    } else {
      // User doesn't have 'admin' role, deny access
      return res.status(403).json({ message: "Permission denied" });
    }
  };
  
  module.exports = { checkAdminRole };
  






//  const restrict = (role) => {
//     return (req, res, next) => {
//         if(req.user.role !== role){
//             res.status(401).send('You do not have permission to perform this action!');
//             next();
//         }
//         return next();
//     }
// };

// module.exports =  restrict;
