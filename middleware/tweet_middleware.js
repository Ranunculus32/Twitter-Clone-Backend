import tweetModel from "../models/tweet_model.js";


// Controller function to create a new tweet
export const createTweet = async (req, res) => {
  try {
    // Assume the userId is sent in the request headers or body
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

