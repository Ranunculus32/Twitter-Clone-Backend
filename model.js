const mongoose = require('mongoose');

// Define the schema for a post
const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the author
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 280 // Twitter character limit
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model for users who liked the post
  }],
  retweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model for users who retweeted the post
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // Reference to the Comment model for post comments
  }]
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
