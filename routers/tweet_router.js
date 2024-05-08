import express from "express";
import {
  createTweet,
  getTweetById,
  deleteTweetById,
  editTweetById,
} from "../middleware/tweet_middleware.js";

const router = express.Router();

router.post("/create", createTweet);
router.get("/:id", getTweetById);
router.delete("/:id", deleteTweetById);
router.put("/:id", editTweetById);

export default router;
