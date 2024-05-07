import express from "express";
import {
  createTweet,
  getTweetById,
  deleteTweetById,
  editTweetById,
  getAllHashTag,
  getMostOccurringHashtags,
  getAllTweets,
} from "../middleware/tweet_middleware.js";

const router = express.Router();

router.post("/create", createTweet);
router.get("/:id", getTweetById);
router.delete("/:id", deleteTweetById);
router.put("/:id", editTweetById);

// Route to get all hashtags
router.get("/", getAllTweets);

// Route to get all hashtags
router.get("/hashtags", getAllHashTag);

// Route to get the most occurring hashtags
router.get("/hashtags/most", getMostOccurringHashtags);

export default router;
