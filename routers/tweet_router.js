import express from "express";
import {
  getAllHashTag,
  getAllTweet,
  getMostOccurringHashtags,
  postATweet,
} from "../middleware/tweet_middleware.js";

const router = express.Router();

// Route to get all tweets
router.get("/", getAllTweet);

// Route to post a new tweet
router.post("/", postATweet);

// Route to get all hashtags
router.get("/hashtags", getAllHashTag);

// Route to get the most occurring hashtags
router.get("/hashtags/most", getMostOccurringHashtags);

export default router;
