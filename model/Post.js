import mongoose,{Schema}  from "mongoose";

// Define the schema for a post
const postSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: 'User', // Reference to the User model for the author
  },
 text: {
    type: String,
    required: true,
    maxlength: 280 
  },

  gifUrl: {
    type: String,
    required: false // This makes the gifUrl optional since not every post might have a GIF.
  }


  
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

export default Post;
