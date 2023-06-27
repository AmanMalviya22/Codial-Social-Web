const Post = require('../models/post');
const Comment=require('../models/comment');
module.exports.create = function (req, res) {
  Post.create({ content: req.body.content, user: req.user._id })
    .then((post) => {
      console.log('Post created:', post);
      // Handle success, e.g., send a response to the client
      res.redirect('/');
    })
    .catch((err) => {
      console.error('Error creating post:', err);
      // Handle error, e.g., send an error response to the client
      res.status(500).send('Internal Server Error');
    });
};

module.exports.destroy=function(req,res){
Post.findById(req.params.id,function(err,post){
  //.id means converting the object into string
  if(post.user==req.user.id){
    post.remove();

    Comment.deleteMany({post:req.params.id},function(err){
      return res.redirect('back');
    });
  }else{
    return res.redirect('back');
  }
});
}