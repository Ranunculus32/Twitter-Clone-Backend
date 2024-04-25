import express from "express";
import {
  getAllHashTag,
  getAllTweet,
  postATweet,
} from "../middleware/tweet_middleware.js";

const router = express.Router();

router.get("/", getAllTweet);

router.post("/", postATweet);

router.get("/hashtags", getAllHashTag);

export default router;
