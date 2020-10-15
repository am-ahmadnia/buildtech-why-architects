const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const checkEmpty = require('./../validation/errorsHandlers/checkEmpty');
const User = require('./../models/User');

const {
  idNotFound,
  passwordIncorrect,
} = require('../validation/errorMessages');

router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  const { errors, isValid } = checkEmpty(req.body);
  if (!isValid) return res.status(400).json(errors);
  let user = null;
  const checkPassword = (enteredPassword, user) => {
    bcrypt.compare(enteredPassword, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRETORKEY,
          {
            expiresIn: 15778476, // 6 months in seconds
          },
          async (err, token) => {
            return res.status(200).json({
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({
          password: passwordIncorrect,
        });
      }
    });
  };
  if (validator.isEmail(id)) {
    const email = id;
    try {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          id: idNotFound,
        });
      }
      checkPassword(password, user);
    } catch (e) {
      return res.status(400);
    }
  } else if (validator.isMobilePhone(id)) {
    const phoneNumber = id;
    try {
      user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(404).json({
          id: idNotFound,
        });
      }
      checkPassword(password, user);
    } catch (e) {
      return res.status(400);
    }
  } else {
    const username = id;
    try {
      user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({
          id: idNotFound,
        });
      }
      checkPassword(password, user);
    } catch (e) {
      return res.status(400).json({});
    }
  }
});

module.exports = router;
