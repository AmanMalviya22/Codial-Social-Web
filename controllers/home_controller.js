const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .exec();

    const users = await User.find({});

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
      user:req.user,
    });
  } catch (err) {
    console.error('Error fetching home data:', err);
    return res.redirect('back');
  }
};
