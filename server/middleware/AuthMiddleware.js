const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const SECRET = 'iamkm';

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, SECRET);

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    console.log('User:', user);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authentication;
