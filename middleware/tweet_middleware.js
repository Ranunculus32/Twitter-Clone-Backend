import Tweets from "../models/tweet_model.js";

//get all tweets

export const getAllTweet = async (req, resp) => {
  const tweets = await Tweets.find();

  resp.status(200).json(tweets);
};

//function to post a tweet
export const postATweet = async (req, resp) => {
  const { userId, content } = req.body;

  // Extract hashtags from content
  const matches = content.match(/#\w+/g) || [];
  const hashtags = matches.map((match) => match.substring(1));

  // Create a new tweet object with hashtags
  const tweet = new Tweets({
    userId,
    content,
    hashtag: hashtags,
  });

  try {
    const createdTweet = await tweet.save();
    resp.status(201).json(createdTweet);
  } catch (error) {
    console.error("Error creating new tweet:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

//get all the hashtag

export const getAllHashTag = async (req, res) => {
  try {
    // get all tweets from the db
    const tweets = await Tweets.find({}, "hashtag");

    // extract hashtags from each tweet
    const allHashtags = tweets.map((tweet) => tweet.hashtag);

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
    const mostOccurringHashtags = await Tweets.aggregate([
      // Unwind the hashtag array to deconstruct it into separate documents
      { $unwind: "$hashtag" },
      // Group by hashtag and count occurrences
      {
        $group: {
          _id: "$hashtag",
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
