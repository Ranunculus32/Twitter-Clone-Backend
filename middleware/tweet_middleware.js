import tweetModel from "../models/tweet_model.js";
import userModel from "../models/user_model.js";

// Controller function to create a new tweet
export const createTweet = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.session || !req.session.user || !req.session.user.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.session.user.userId;

    // Retrieve user profile data
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract content from request body
    const { username } = user;
    const { content } = req.body;

    // Validate content
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Extract hashtags
    const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || [];

    // Create tweet with profile data
    const newTweet = new tweetModel({
      username,
      userId,
      content,
      hashtags,
    });

    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    console.error("Error creating tweet:", error);
    res
      .status(500)
      .json({ message: "Error creating tweet", error: error.message });
  }
};

export const getTweetById = async (req, res) => {
  try {
    const tweetId = req.params.id; // Assuming the tweet ID is passed in the request parameters

    const tweet = await tweetModel.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    res.status(200).json(tweet);
  } catch (error) {
    console.error("Error fetching tweet:", error);
    res
      .status(500)
      .json({ message: "Error fetching tweet", error: error.message });
  }
};

// Controller function to delete a post by ID
export const deleteTweetById = async (req, res) => {
  try {
    const { id } = req.params;

    const tweet = await tweetModel.findById(id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    await tweet.delete();
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    console.error("Error deleting tweet by ID:", error);
    res
      .status(500)
      .json({ message: "Error deleting tweet by ID", error: error.message });
  }
};

// Controller function to edit a post by ID
export const editTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const tweet = await tweetModel.findById(id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    tweet.content = content;
    await tweet.save();
    res.status(200).json(tweet);
  } catch (error) {
    console.error("Error editing tweet by ID:", error);
    res
      .status(500)
      .json({ message: "Error editing tweet by ID", error: error.message });
  }
};

//get all the hashtag

export const getAllHashTag = async (req, res) => {
  try {
    // get all tweets from the db
    const tweets = await tweetModel.find({}, "hashtag");
    console.log("tweet", tweets);
    // extract hashtags from each tweet
    const allHashtags = tweets.map((tweet) => tweet.hashtags);

    console("all hash", allHashtags);

    res.json({ hashtags: allHashtags });
  } catch (error) {
    console.error("Error fetching hashtags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route  to get most occurring hashtags
export const getMostOccurringHashtags = async (req, res) => {
  try {
    // Aggregate pipeline to get most occurring hashtags
    const mostOccurringHashtags = await tweetModel.aggregate([
      // Unwind the hashtag array to deconstruct it into separate documents
      { $unwind: "$hashtags" },
      // Group by hashtag and count occurrences
      {
        $group: {
          _id: "$hashtags",
          count: { $sum: 1 }, // Count occurrences of each hashtag
        },
      },
      // Sort by count in descending order
      { $sort: { count: -1 } },
      // Limit to the top n most occurring hashtags
      { $limit: 5 }, // Change the limit as needed
    ]);

    // Send the result as a response
    res.json(mostOccurringHashtags);
  } catch (error) {
    // Handle errors
    console.error("Error getting most occurring hashtags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
