const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user
    });
  } catch (err) {
    console.error("Error finding user:", err);
    return res.redirect("back");
  }
};


// Render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/sign-in");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// Render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// Get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in creating user while signing up", error);
    return res.redirect("back");
  }
};

// Sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      // Handle the error, e.g., display an error message or redirect to an error page
      console.error(err);
    }
    return res.redirect("/");
  });
};
