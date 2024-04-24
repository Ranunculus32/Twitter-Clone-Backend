import mongoose from 'mongoose';
import User from './user_model.js';


const postSchema = new mongoose.Schema({
  /*   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  }, */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,

  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});


const Post = mongoose.model('Post', postSchema);

export default Post;

