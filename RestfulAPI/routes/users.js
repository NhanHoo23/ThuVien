var express = require('express');
var router = express.Router();
var User = require('../models/users');

//Lấy dữ liệu user
router.get('/get-users', (req, res) => {
  User.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Get user failed' });
    })
})

//Post /register
router.post('/register', (req, res) => {
  const { name, username, password, dateOfBirth, phoneNumber } = req.body;
  const user = new User({
    name,
    username,
    password,
    dateOfBirth,
    phoneNumber
  });
  user.save()
    .then((saveUser) => {
      res.status(201).json({ message: 'User created successfully', user: saveUser });
    })
    .catch((err) => {
      res.status(500).json({ message: 'User created failed: ' + err });
    })
})

//POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
