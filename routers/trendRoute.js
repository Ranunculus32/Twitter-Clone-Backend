import express from "express";
import {
  getAllHashTag,
  getOwnTweets,
  getMostOccurringHashtags,
  getAllTweets,
} from "../middleware/trend_middleware.js";

const trendRouter = express.Router();

// Route to get all hashtags
trendRouter.get("/", getAllTweets);

//route to get all tweets of a user
trendRouter.get("/:userId", getOwnTweets);

// Route to get all hashtags
trendRouter.get("/hashtags", getAllHashTag);

// Route to get the most occurring hashtags
trendRouter.get("/hashtags/most", getMostOccurringHashtags);

export default trendRouter;
