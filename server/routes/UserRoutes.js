const authentication = require('../middleware/AuthMiddleware')
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'iamkm';

router.get('/init', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.query.username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.json({ username: user.username });
    } catch (error) {
        console.error('Error during initialization:', error);
        res.status(500).json({ message: 'Something went wrong during initialization' });
    }
});

router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            return res.status(403).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
             username,
             password : hashedPassword,
             LanguageprofiencyScore: 0, 
             LanguageprofiencyLevel: 0
             });

        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '30d' });

        res.json({
            message: 'User created successfully',
            token,
            username: newUser.username,
            LanguageprofiencyScore: newUser.LanguageprofiencyScore,
            LanguageprofiencyLevel : newUser.LanguageprofiencyLevel
        });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Something went wrong during signup' });
    }
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }).select('username password LanguageprofiencyScore LanguageprofiencyLevel');

        if (!user) {
            return res.status(403).json({ message: 'Invalid username or password' });
        }

        if (!user.password) {
            return res.status(500).json({ message: 'Password not found in user object' });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '30d' });

        res.json({
            message: 'Logged in successfully',
            _id: user._id,
            token,
            username: user.username,
            LanguageprofiencyScore: user.LanguageprofiencyScore,
            LanguageprofiencyLevel: user.LanguageprofiencyLevel,
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
});
router.put('/updateUserScore', authentication, async (req, res, next) => {
    try {
      const { userId, score } = req.body;
        console.log(`User ${userId}`)
      const updatedUser = await User.findByIdAndUpdate(userId, {
        LanguageprofiencyScore: score,
      }, { new: true }); 
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User score updated successfully', updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
  });
  

module.exports = router;




module.exports = router;
