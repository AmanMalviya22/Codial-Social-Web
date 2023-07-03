const Post = require("../../../models/post");
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
  try {
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    return res.status(200).json({
      message: "List of posts",
      posts: posts,
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
  
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  
    if (post.user.equals(req.user._id)) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
  
      return res.status(200).json({
        message: "Post and associated comments deleted successfully",
      });
    } else {
      return res.status(401).json({
        message: "You are not authorized to delete this post",
      });
    }
  } catch (err) {
    console.error('Error finding or deleting post:', err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
