const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
  Post.create({ content: req.body.content, user: req.user._id })
    .then((post) => {
      console.log('Post created:', post);
      req.flash('success','post published');
      res.redirect('/');
    })
    .catch((err) => {
      req.flash('error',err);
      console.error('Error creating post:', err);
      res.status(500).send('Internal Server Error');
    });
};


module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.error('Post not found');
      return res.redirect('back');
    }

    if (post.user.equals(req.user._id)) {
      await post.deleteOne(); // Updated: Replaced remove() with deleteOne()
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success','post and associated comments are deleted');
      return res.redirect('back');
    } else {
      req.flash('error','you can not delete the post');
      return res.redirect('back');
    }
  } catch (err) {

    req.flash('error',err);

    console.error('Error finding or deleting post:', err);
    return res.redirect('back');
  }
};