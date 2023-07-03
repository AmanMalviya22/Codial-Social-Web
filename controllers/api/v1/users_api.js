const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(user.toJSON(), "codial", { expiresIn: "100000" });

    return res.status(200).json({
      message: "Sign in successful. Here is your token, please keep it safe.",
      data: {
        token: token,
      },
    });
  } catch (err) {
    console.error('Error creating user session:', err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
