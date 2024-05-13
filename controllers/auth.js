const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

//sign up route
router.get('/sign-up', (req, res) => {
    res.render('./auth/sign-up');
});

//sign in route
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in')
})

//create user profile
router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('That username is already taken.');
        };
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Passwords do not match. Please try again.');
        };
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        await User.create(req.body);
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
})

//sign up with user profile
router.post('/sign-up', async (req,res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {
            return res.send('Wrong username. Please try again.');
        }
        const correctPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password,
        );
        if (!correctPassword) {
            return res.send('Wrong password. Please try again.');
        }
        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        }
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
})

//sign in with user profile
router.post('/sign-in', async (req, res) => {
    try {
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (!userInDatabase) {
        return res.send('Wrong username. Please try again.');
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
      );
      if (!validPassword) {
        return res.send('Wrong password. Please try again.');
      }

      req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
      };
  
      res.redirect('/drugs/index');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  //sign out 
  router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })
module.exports = router