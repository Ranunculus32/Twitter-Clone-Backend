import tweetModel from "../models/tweet_model.js";


// Controller function to create a new tweet
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
    const tweets = await tweetModel.find();
    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to get a post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await tweetModel.findById(id);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
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


