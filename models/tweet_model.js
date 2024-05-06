import mongoose from "mongoose";

// Define the schema for tweets
const tweetSchema = new mongoose.Schema({

  username: {
    type: String,
  },
  userId: {
    type:String,
  },
  content: {
    type: String,
    required: true,
    maxlength: 280
  },
  likes: {
    type:Number,
    default:0
  },

  comments: {
    type:Number,
    default:0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  hashtags: [{
    type: String
  }]
});


const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
