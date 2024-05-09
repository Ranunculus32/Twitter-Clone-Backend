import express from "express";
import {
  getAllHashTag,
  getMostOccurringHashtags,
  getAllTweets,
} from "../middleware/trend_middleware.js";

const trendRouter = express.Router();

// Route to get all hashtags
trendRouter.get("/", getAllTweets);

// Route to get all hashtags
trendRouter.get("/hashtags", getAllHashTag);

// Route to get the most occurring hashtags
trendRouter.get("/hashtags/most", getMostOccurringHashtags);

export default trendRouter;
