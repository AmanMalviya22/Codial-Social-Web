const User = require("../models/user");

// Controller for profile route and exported it for global use
module.exports.profile = function (req, res) {
  return res.render("user_profile", { title: "User Profile" });
};

// Controller for user signup
module.exports.signup = function (req, res) {
  return res.render("user_sign_up", { title: "Sign Up" });
};

// Controller for user signin
module.exports.signin = function (req, res) {
  return res.render("user_sign_in", { title: "Sign In" });
};

// Sign up controller
module.exports.create = function (req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // User already exists, redirect to sign-in page
        return res.redirect("/users/sign-in");
      } else {
        // Create a new user
        // return
        User.create(req.body);
        //   .then(() => {
        // User created successfully, redirect to sign-in page
        return res.redirect("/users/sign-in");
        //   });
      }
    })
    .catch((err) => {
      console.log("Error in creating user:", err);
      return res.redirect("back");
    });
};

// Sign in controller
//sign in and create a session for the user
// module.exports.createSession = function (req, res) {
//     //steps to authenticate
//     //find the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     //handle user found
//     if (user) {
//       //handle password which does not match
//       if (user.password != user.body.password) {
//         return res.redirect("back");
//       }

//       //handle sesssion creation
//       res.cookie("user_id", user_id);
//       return res.redirect("/users/profile");
//     }
//     else{
//         //handle user not found
         
//         return res.redirect('back');
//     }
//   });
// };


// Sign in controller
module.exports.createSession = function (req, res) {
    // Find the user by email
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user && user.password) {
          // User found and password is defined
          if (user.password === req.body.password) {
            res.cookie("user_id", user._id);
            // Password matches, create the session and redirect to the profile page
            // Your session creation logic goes here
            res.redirect('/users/profile');
          } else {
            // Password does not match, redirect back to the sign-in page with an error message
            res.redirect('/users/sign-in');
          }
        } else {
          // User not found or password is undefined, redirect back to the sign-in page with an error message
          res.redirect('/users/sign-in');
        }
      })
      .catch((err) => {
        console.log('Error in signing in:', err);
        res.redirect('/users/sign-in');
      });
  };
  