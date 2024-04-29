import express from 'express';
import {
  createTweet,
  getAllTweets,
  getTweetById,
  updateTweetById,
  deleteTweetById
} from '../controllers/tweet_controller.js';

const router = express.Router();

// Route to create a new tweet
router.post('/', createTweet);

// Route to get all tweets
router.get('/', getAllTweets);

// Route to get a single tweet by ID
router.get('/:id', getTweetById);

// Route to update a tweet by ID
router.patch('/:id', updateTweetById);

// Route to delete a tweet by ID
router.delete('/:id', deleteTweetById);

export default router;
