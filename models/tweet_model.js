import mongoose from "mongoose";

// Define the schema for tweets
const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 280 
  },
  userId: {
    type: mongoose.Type.ObjectId,    // 
    ref: 'User', 
    required: true
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