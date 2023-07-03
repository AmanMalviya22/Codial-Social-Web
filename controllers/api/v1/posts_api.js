const Post = require("../../../models/post");
const Comment=require('../../../models/comment');
module.exports.index = async function (req, res) {
  const posts = await Post.find({})
    .sort(`-createdAt`)
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "list of posts",
    posts: posts,
  });
};



module.exports.destroy = async function(req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
    //   if (!post) {
    //     console.error('Post not found');
    //     return res.redirect('back');
    //   }
  
    //   if (post.user.equals(req.user._id)) {
        await post.deleteOne(); // Updated: Replaced remove() with deleteOne()
        await Comment.deleteMany({ post: req.params.id });
        return res.json(200,{
            message:"Post and associated comments deleted successfullyy"
        });
        // req.flash('success','post and associated comments are deleted');
        return res.redirect('back');
    //   } else {
        req.flash('error','you can not delete the post');
        return res.redirect('back');
      }
    // } 
    catch (err) {
  
    //   req.flash('error',err);
  
      console.error('Error finding or deleting post:', err);
      return res.json(500, {
        message:"internal server error"
      })
    }
  };