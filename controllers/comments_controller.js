const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      res.redirect("/");
    }
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("An error occurred.");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (comment.user == req.user.id) {
      let postId = comment.post;
      // await comment.remove();
      await Comment.deleteOne({ _id: req.params.id });
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } }
      );
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};