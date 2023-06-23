const User = require('../models/user');

// Controller for profile route and exported it for global use
module.exports.profile = function (req, res) {
  return res.render('user_profile', { title: 'User Profile' });
};

// Controller for user signup
module.exports.signup = function (req, res) {
  return res.render('user_sign_up', { title: 'Sign Up' });
};

// Controller for user signin
module.exports.signin = function (req, res) {
  return res.render('user_sign_in', { title: 'Sign In' });
};

// Sign up controller
module.exports.create = function (req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // User already exists, redirect to sign-in page
        return res.redirect('/users/sign-in');
      } else {
        // Create a new user
        // return 
        User.create(req.body)
        //   .then(() => {
            // User created successfully, redirect to sign-in page
            return res.redirect('/users/sign-in');
        //   });
      }
    })
    .catch((err) => {
      console.log('Error in creating user:', err);
      return res.redirect('back');
    });
};

// Sign in controller
module.exports.createSession = function (req, res) {
  // Example code: Redirect to home page
  res.redirect('/');
};
