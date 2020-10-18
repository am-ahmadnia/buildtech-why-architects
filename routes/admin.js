const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../models/User');
const Task = require('./../models/Task');
const checkEntries = require('./../validation/errorsHandlers/errorHandlers');
const checkEmpty = require('./../validation/errorsHandlers/checkEmpty');
const isEmpty = require('is-empty');

const {
  usernameExists,
  emailExists,
  phoneNumberExists,
  nationalCodeExists,
  personalCodeExists,
  password2NotMatch,
} = require('./../validation/errorMessages');

// User Related Routes
router.post('/add-user', async (req, res) => {
  if (
    req.body.role === undefined ||
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.password2 === undefined ||
    req.body.password === undefined
  )
    return res.status(400).json({ m: 'enter data' });

  const { errors, isValid } = checkEntries(req.body);
  if (!isValid) return res.status(400).json(errors);
  const {
    role,
    firstName,
    lastName,
    phoneNumber,
    username,
    password,
    password2,
  } = req.body;
  if (password !== password2)
    return res.status(400).json({ password2NotMatch });
  const user = new User({
    role,
    firstName,
    lastName,
    username,
    password,
    phoneNumber,
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
        res.status(400).json({ e });
      }
    });
  });
});

// Task Related Routes
router.patch('/:username/:taskId', async (req, res) => {
  const { errors, isValid } = checkEmpty(req.body);
  if (!isValid) return res.status(400).json(errors);
  try {
    const task = await User.findById(req.params.id);
    for (const key in req.body) {
      task[key] = req.body[key];
    }
    await task.save();
    res.status(200).json({});
  } catch (e) {
    res.status(400).json({});
  }
});

router.post('/:username/add-task', async (req, res) => {
  if (
    req.body.projectTitle === undefined ||
    req.body.description === undefined ||
    req.body.deliveryDate === undefined ||
    req.body.progressUntilToday === undefined
  )
    return res.status(400).json({ m: 'enter data' });

  const { errors, isValid } = checkEntries(req.body);
  if (!isValid) return res.status(400).json(errors);
  const {
    projectTitle,
    description,
    deliveryDate,
    progressUntilToday,
  } = req.body;
  try {
    const user = await User.findOne({ username: req.params.username });
    // if (user.role !== 'admin') {
    //   return res.status(400).json({ m: 'sorry bitch' });
    // }
    const userId = user._id;
    const task = new Task({
      projectTitle,
      description,
      deliveryDate,
      progressUntilToday: +progressUntilToday,
      addedBy: userId,
    });
    await task.save();
    res.status(201).json({});
  } catch (e) {
    res.status(400).json({ e });
  }
});

// Customer Related Routes
// router.delete('/customers/:id', async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({});
//   } catch (e) {
//     res.status(400).json({});
//   }
// });

// router.patch('/customers/:id', async (req, res) => {
//   if (
//     req.body.name === undefined ||
//     req.body.type === undefined ||
//     req.body.apps === undefined ||
//     req.body.startDate === undefined ||
//     req.body.endDate === undefined
//   )
//     return res.status(400).json({ m: 'enter data' });
//   const { errors, isValid } = checkEntries(req.body);
//   if (!isValid) return res.status(400).json(errors);
//   const { name, type, apps, startDate, endDate } = req.body;
//   try {
//     await User.findByIdAndUpdate(req.params.id, {
//       $set: { name, type, apps, startDate, endDate },
//     });
//     res.status(200).json({});
//   } catch (e) {
//     res.status(400).json({});
//   }
// });

// router.post('/customers/add', async (req, res) => {
//   if (
//     req.body.projects === undefined ||
//     req.body.name === undefined ||
//     req.body.type === undefined ||
//     req.body.apps === undefined ||
//     req.body.startDate === undefined ||
//     req.body.endDate === undefined
//   )
//     return res.status(400).json({ m: 'enter data' });
//   const { errors, isValid } = checkEntries(req.body);
//   if (!isValid) return res.status(400).json(errors);
//   const { name, type, startDate, endDate, apps } = req.body;
//   const customer = new Customer({
//     name,
//     type,
//     startDate,
//     endDate,
//     apps,
//   });
//   try {
//     await customer.save();
//     res.status(201).json({ success: true });
//   } catch (e) {
//     res.status(400).json({});
//   }
// });

// router.get('/customers', async (req, res) => {
//   try {
//     const customers = await Customer.find({});
//     res.status(200).json(customers);
//   } catch (e) {
//     res.status(400).json({});
//   }
// });

// router.get('/customers/:id', async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.params.id);
//     res.status(200).json(customer);
//   } catch (e) {
//     res.status(400).json({});
//   }
// });

// User Related Routes

router.post('/users/:id/change-password', async (req, res) => {
  if (
    req.body.currentPassword === undefined ||
    req.body.newPassword === undefined ||
    req.body.newPassword2 === undefined
  )
    return res.status(400).json({ m: 'enter data' });
  const { errors, isValid } = checkEntries(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { currentPassword, newPassword, newPassword2 } = req.body;
  if (newPassword !== newPassword2)
    return res.status(400).json({ newPassword2: password2NotMatch });

  try {
    const user = await User.findById(req.params.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (isMatch) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, async (err, hash) => {
          if (err) throw err;
          try {
            user.password = hash;
            await user.save();
            return res.status(200).json({});
          } catch (e) {
            return res.status(400).json({});
          }
        });
      });
    } else return res.status(400).json({ currentPassword: password2NotMatch });
  } catch (e) {
    return res.status(400).json();
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } catch (e) {
    res.status(400).json({});
  }
});

router.post('/users/:id/edit', async (req, res) => {
  if (
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.username === undefined ||
    req.body.email === undefined ||
    req.body.phoneNumber === undefined ||
    req.body.nationalCode === undefined ||
    req.body.personalCode === undefined
  )
    return res.status(400).json({ m: 'enter data' });
  const { errors, isValid } = checkEntries(req.body);
  if (!isValid) return res.status(400).json(errors);
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    nationalCode,
    personalCode,
  } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        nationalCode,
        personalCode,
      },
    });
    res.status(200).json({});
  } catch (e) {
    res.status(400).json({});
  }
});

router.post('/users/add', async (req, res) => {
  if (
    req.body.role === undefined ||
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.username === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.phoneNumber === undefined ||
    req.body.nationalCode === undefined ||
    req.body.personalCode === undefined
  )
    return res.status(400).json({ m: 'enter data' });

  const { errors } = checkEntries(req.body);
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    nationalCode,
    personalCode,
    role,
  } = req.body;
  const user = new User({
    role,
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    nationalCode,
    personalCode,
  });
  try {
    const usernameMatch = await User.findOne({ username });
    if (usernameMatch) errors.username = usernameExists;
    const emailMatch = await User.findOne({ email });
    if (emailMatch) errors.email = emailExists;
    const phoneNumberMatch = await User.findOne({ phoneNumber });
    if (phoneNumberMatch) errors.phoneNumber = phoneNumberExists;
    const nationalCodeMatch = await User.findOne({ nationalCode });
    if (nationalCodeMatch) errors.nationalCode = nationalCodeExists;
    const personalCodeMatch = await User.findOne({ personalCode });
    if (personalCodeMatch) errors.personalCode = personalCodeExists;

    if (!isEmpty(errors)) return res.status(400).json(errors);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) throw err;
        user.password = hash;
        try {
          await user.save();
          res.status(201).json({});
        } catch (e) {
          res.status(400).json({});
        }
      });
    });
  } catch (e) {
    res.status(400).json({});
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({});
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({});
  }
});

// Admin Related Routes

module.exports = router;
