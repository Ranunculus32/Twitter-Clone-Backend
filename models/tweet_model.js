import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashtag: {
    type: Array,
  },
});

const Tweets = mongoose.model("Tweets", tweetSchema);

export default Tweets;
