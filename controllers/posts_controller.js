const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({ content: req.body.content, user: req.user._id });
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post
        },message:"post is created"
      })
    }
    console.log('Post created:', post);
    req.flash('success', 'Post published');
    res.redirect('/');
  } catch (err) {
    req.flash('error', err);
    console.error('Error creating post:', err);
    res.status(500).send('Internal Server Error');
  }
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
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"post deleted "
        })
      }
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