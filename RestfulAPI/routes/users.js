var express = require('express');
var router = express.Router();
var User = require('../models/users');

//Get
router.get('/get-users', (req, res) => {
  User.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Get user failed' });
    })
})

//Post 
router.post('/register', (req, res) => {
  const { name, username, password, dateOfBirth, phoneNumber, role } = req.body;
  const user = new User({
    name,
    username,
    password,
    dateOfBirth,
    phoneNumber,
    role
  });
  user.save()
    .then((saveUser) => {
      res.status(201).json({ message: 'User created successfully', user: saveUser });
    })
    .catch((err) => {
      res.status(500).json({ message: 'User created failed: ' + err });
    })
})

//POST Member
router.post('/register-member', (req, res) => {
  const { name, dateOfBirth, phoneNumber, role } = req.body;
  const user = new User({
    name,
    dateOfBirth,
    phoneNumber,
    role
  });
  user.save()
    .then((saveUser) => {
      res.status(201).json({ message: 'Member created successfully', user: saveUser });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Member created failed: ' + err });
    })
})

//PUT
router.put('/update-member/:id', (req, res) => {
  const id = req.params.id;
  const { name, dateOfBirth, phoneNumber } = req.body;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.name = name;
      user.dateOfBirth = dateOfBirth;
      user.phoneNumber = phoneNumber;

      return user.save();
    })
    .then((updatedUser) => {
      res.status(200).json({ message: 'Member updated successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Update member failed: ' + err });
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

//PUT
router.put('/update-user/:id', async (req, res) => {
  const id = req.params.id;
  const { name, username, password, dateOfBirth, phoneNumber } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.username = username;
    user.password = password;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });

  } catch (error) {
    res.status(500).json({ message: 'Update user failed: ' + error });
  }
})

//DELETE
router.delete('/delete-user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete user failed: ' + error });
  }
})


module.exports = router;
