const express = require('express');
const checkEntries = require('../validation/errorsHandlers/errorHandlers');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/User');
const Task = require('../models/Task');

const {
  currentPasswordEmpty,
  newPasswordEmpty,
  newPassword2Empty,
  userNotFound,
  currentPasswordIncorrect,
  password2NotMatch,
} = require('../validation/errorMessages');

// uUser Realated Routes
router.post('/users/:id/edit-profile', async (req, res) => {
  // const { errors, isValid } = checkEntries(req.body);
  const user = await User.findById(req.params.id);
  for (const key in req.body) {
    user[key] = req.body[key];
  }
  try {
    await user.save();
    res.status(200).json({});
  } catch (e) {
    res.status(400).json({});
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    for (const key in user) {
      if (key === 'updatedAt' || key === 'createdAt' || key === 'password')
        delete user[key];
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json();
  }
});

// Task Related Routs
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(200).json({});
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findOne({});
    res.status(200).json(task);
  } catch (e) {
    res.status(200).json({});
  }
});

router.post('/:username/:taskId/update-task', async (req, res) => {
  if (
    req.body.todaysProgress === undefined ||
    req.body.hoursSpent === undefined
  )
    return res.status(400).json({ m: 'enter data' });
  const { errors, isValid } = checkEntries(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { todaysProgress, hoursSpent } = req.body;

  try {
    // change here
    const userId = await (await User.findOne({ username: req.params.username }))
      ._id;
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      $set: {
        todaysProgress,
        hoursSpent,
        updatedBy: userId,
      },
    });
    res.status(200).json({ updatedTask });
  } catch (e) {
    res.status(400).json({});
  }
});

router.post('/:id/change-password', async (req, res) => {
  const _errors = {};
  for (const key in req.body) {
    console.log(key);
  }
  if (!req.body.currentPassword) _errors.currentPassword = currentPasswordEmpty;
  if (!req.body.newPassword) _errors.newPassword = newPasswordEmpty;
  if (!req.body.newPassword2) _errors.newPassword2 = newPassword2Empty;
  const { currentPassword, newPassword, newPassword2 } = req.body;
  if (!isEm) console.log(_errors);
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(401).json({
        errors: {
          user: userNotFound,
        },
      });
    if (!validator.equals(newPassword, newPassword2))
      _errors.newPassword2 = password2NotMatch;
    bcrypt.compare(currentPassword, user.password).then((isMatch) => {
      if (!isMatch) {
        _errors.currentPassword = currentPasswordIncorrect;
        return res.status(400).json({ ..._errors });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, async (err, hash) => {
            if (err) throw err;
            user.password = hash;
            try {
              await user.save();
              res.status(200).json({});
            } catch (e) {
              res.status(400).json({});
            }
          });
        });
      }
    });

    // const isMatch = await bcrypt.compare(currentPassword, user.password);
    // if (isMatch) return res.status(200).json({ m: 'true' });
    // else return res.status(400).json({ m: 'false' });
  } catch (e) {
    res.status(400).json({ e });
  }
});

module.exports = router;
