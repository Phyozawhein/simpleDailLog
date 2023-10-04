const jwt =require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null; // Authorization: 'Bearer TOKEN'
      if (!token) {
        throw new Error('Authentication failed!');
      }
      const decodedToken = jwt.verify(token, 'private_token');
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (err) {
      
      return next(err.message);
    }
  };
  