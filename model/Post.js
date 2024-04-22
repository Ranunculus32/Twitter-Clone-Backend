import mongoose,{Schema}  from "mongoose";

// Define the schema for a post
const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User', // Reference to the User model for the author
  },
 text: {
    type: String,
    required: true,
    maxlength: 280 
  },




  
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

export default Post;
