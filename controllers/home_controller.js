const Post = require("../models/post");

module.exports.home = function(req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 25);

  // Post.find({})
  //   .then((posts) => {
  //     return res.render("home", {
  //       title: "Home",
  //       posts: posts,
  //     });
  //   })
  //   .catch((err) => {
  //     // Handle the error
  //     console.error(err);
  //     // Return an appropriate response
  //     return res.status(500).send("An error occurred.");
  //   });

  // populate the user of each post
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then(function(posts) {
      return res.render("home", {
        title: "codial | Home",
        posts: posts,
      });
    })
    .catch(function(err) {
      // Handle the error
      console.error(err);
      // Return an appropriate response
      return res.status(500).send("An error occurred.");
    });
};

// module.exports.actionName = function(req, res){}


