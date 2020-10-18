const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const checkEmpty = require('../validation/errorsHandlers/checkEmpty');
const User = require('../models/User');
const { userNotFound } = require('./../validation/errorMessages').user;

const {
  idNotFound,
  passwordIncorrect,
} = require('../validation/errorMessages');

const enterData = {
  m: 'enter data',
};

router.get('/fetch-all', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {}
});

router.post('/add-user', async (req, res) => {
  const {
    role,
    firstName,
    lastName,
    username,
    phoneNumber,
    nationalCode,
    email,
    password,
  } = req.body;
  const user = new User({
    role,
    firstName,
    lastName,
    username,
    phoneNumber: +phoneNumber,
    nationalCode: +nationalCode,
    email,
    password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      if (err) throw err;
      user.password = hash;
      try {
        await user.save();
        res.status(201).json({});
      } catch (e) {
        // change here
        sendEmptyResponse(res, 400);
      }
    });
  });
});

router.post('/:username/change-password', async (req, res) => {
  const { newPassword, newPassword2 } = req.body;
  
});

router.post('/:username/check-password', async (req, res) => {
  const { password } = req.body;
  if (password === undefined) sendNoDataResponse(res);
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) sendNoDataResponse(res);
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) sendEmptyResponse(res, 200);
      else sendEmptyResponse(res, 400);
    });
  } catch (e) {
    sendEmptyResponse(res, 400);
  }
});

router.post('/check-id', async (req, res) => {
  const { id } = req.body;
  if (id === undefined) sendNoDataResponse(res);
  if (validator.isEmail(id)) {
    const email = id;
    try {
      const user = await User.findOne({ email });
      if (!user) sendResponse(res, 400, null, { userNotFound });
      sendResponse(res, 200);
    } catch (e) {
      sendEmptyResponse(res);
    }
  } else if (validator.isMobilePhone(id)) {
    const phoneNumber = id;
    try {
      const user = await User.findOne({ phoneNumber });
      if (!user) sendResponse(res, 400, null, { userNotFound });
      sendResponse(res, 200);
    } catch (e) {
      sendEmptyResponse(res);
    }
  } else {
    const username = id;
    try {
      const user = await User.findOne({ username });
      if (!user) sendResponse(res, 400, null, { userNotFound });
      sendResponse(res, 200);
    } catch (e) {
      sendEmptyResponse(res);
    }
  }
});
router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  if (id === undefined || password === undefined)
    return res.status(400).json({ m: 'enter data' });
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

const sendNoDataResponse = (res) => {
  return res.status(400).json(enterData);
};
const sendResponse = (res, status, data = {}, errors = {}) => {
  if (status === 200) {
    return res.status(200).json(data);
  } else if (status === 400) {
    console.log('send response');
    return res.status(400).json(errors);
  }
};
const sendEmptyResponse = (res, status, e) => {
  if (status === 200) {
    return res.status(200).json({});
  } else if (status === 400) {
    console.log('send empty response');
    return res.status(400).json({ e });
  }
};

module.exports = router;
