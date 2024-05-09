import express from "express";
import {
  getAllHashTag,
  getMostOccurringHashtags,
  getAllTweets,
  getOwnTweets,
} from "../middleware/trend_middleware.js";

const router = express.Router();

// Route to get all hashtags
router.get("/", getAllTweets);

//route to get all tweets of a user
router.get("/:userId", getOwnTweets);

// Route to get all hashtags
router.get("/hashtags", getAllHashTag);

// Route to get the most occurring hashtags
router.get("/hashtags/most", getMostOccurringHashtags);

export default router;
