import mongoose,{Schema}  from "mongoose";

// Define the schema for a post
const postSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User', 
  },
 content: {
    type: String,
    required: true,
    maxlength: 280 
  },

  createdAt: {
    type: Date,
    default: Date.now
  },




  
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

export default Post;
