const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {

    //CHANGE :: POPULATE THE LIKES OF EACH POST AND COMMENT
    const posts = await Post.find({})
      .sort(`-createdAt`)
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate:{
          path:'likes'
        }
      }).populate('likes');
      // .exec();

    const users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
      user: req.user,
    });
  } catch (err) {
    console.error("Error fetching home data:", err);
    return res.redirect("back");
  }
};
