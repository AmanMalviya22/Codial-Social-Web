const Post = require('../models/post');

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
