import tweetModel from "../models/tweet_model.js";
import User from "../models/user_model.js";
import Comment from "../models/Comment.js";


// Controller function to create a new tweet
export const randomImage = async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching random dog image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTweet = async (req, res) => {
  try {

    const { content, userId, username } = req.body;

    const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || [];

    // Create a new tweet
    const newTweet = new tweetModel({
      userId,
      username: username,
      content,
      hashtags,
    });

    // Save the tweet to the database
    await newTweet.save();

    // Send the created tweet as response
    res.status(201).json(newTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to get all posts
export const getAllPosts = async (req, res) => {

  try {
    const tweets = await tweetModel.find()
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          select: 'username fullName' // Populate userId with username and fullName
        }
      })
      .populate('userId', 'username fullName');
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  /*   try {
      const tweets = await tweetModel.find();
      res.status(200).json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } */
}

// Controller function to get a post by ID
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId, isReply: false })
      .populate('userId', 'username fullName') // Populate userId with username and fullName
      .populate({
        path: 'reply',
        populate: { path: 'userId', select: 'username fullName' }
      });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getFollowingPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get the list of users the current user is following
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log user following details
    console.log('User following details:', user.following);

    const followingIds = user.following.map(followingUser => followingUser.followingId);

    // Log followingIds array
    console.log('Following IDs:', followingIds);

    const posts = await tweetModel.find({ userId: { $in: followingIds } })
      .populate('userId', 'username fullName')
      .sort({ createdAt: -1 });

    // Log fetched posts
    console.log('Fetched posts:', posts);

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching following posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Controller function to edit a post by ID
export const editById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, userId, username } = req.body;

    const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || [];

    const updatedTweet = await tweetModel.findByIdAndUpdate(
      id,
      { content, userId, username, hashtags },
      { new: true }
    );

    if (!updatedTweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.status(200).json(updatedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to delete a post by ID
export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTweet = await tweetModel.findByIdAndDelete(id);

    if (!deletedTweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
