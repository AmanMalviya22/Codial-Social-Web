// const mongoose = require('mongoose');
// const comment=require('./comment');
// const postSchema = new mongoose.Schema({
//     content: {
//         type: String,
//         required: true,
        
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     },
//     comments: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'comment'
//     }
    
// }, {
//     timestamps: true
// });


// const Post = mongoose.model('Post', postSchema);

// module.exports =Post;


const mongoose = require('mongoose');
const commentSchema = require('./comment');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;



