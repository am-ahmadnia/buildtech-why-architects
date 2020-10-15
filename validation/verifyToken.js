require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRETORKEY);
    req.user = verified;
    next();
  } catch (e) {
    console.error('invalid token');
    res.status(400).send('Invalid Token');
  }
};
