const User = require("../models/user");

// Controller for profile route and exported it for global use
module.exports.profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id);
      if (user) {
        return res.render("user_profile", {
          title: "user profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    } else {
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res.status(500).send("Internal Server Error");
  }
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

// Sign in and create a session for the user
module.exports.createSession = function (req, res) {
   return res.redirect('/');
};
