import tweetModel from "../models/tweet_model.js";

// Function to get all tweets
export const getAllTweets = async (req, res) => {
  // Retrieve all users from the database send as JSON response
  const tweets = await tweetModel.find();
  res.status(200).json(tweets);
};

//get all the hashtag

export const getAllHashTag = async (req, res) => {
  try {
    // get all tweets from the db
    const tweets = await tweetModel.find({}, "hashtag");
    console.log("tweet", tweets);
    // extract hashtags from each tweet
    const allHashtags = tweets.map((tweet) => tweet.hashtags);

    console.log("all hash", allHashtags);

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
