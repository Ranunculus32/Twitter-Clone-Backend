import Tweet from '../models/tweet_model.js';
// import User from '../models/user_model.js';

export const createTweet = async (req, res) => {
  try {
    const { content, userId, hashtags } = req.body;

    
    const newTweet = new Tweet({
      content,
      userId,
      hashtags
    });

    const savedTweet = await newTweet.save();
    res.status(201).json(savedTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, hashtags } = req.body;

    const updatedTweet = await Tweet.findByIdAndUpdate(id, { content, hashtags }, { new: true });

    if (!updatedTweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    
    res.json(updatedTweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTweet = await Tweet.findByIdAndDelete(id);
    if (!deletedTweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};
