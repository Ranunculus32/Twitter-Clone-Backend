import express from 'express';
import { createTweet, getAllPosts, getPostById, getFollowingPosts, editById, deleteById, randomImage } from '../middleware/tweet_middleware.js';

const router = express.Router();

router.post('/create', createTweet);
router.post('/random-dog-image', randomImage);
router.get('/all', getAllPosts);
router.get('/followingPosts/:userId', getFollowingPosts);
router.get('/:postId', getPostById);
router.put('/:id', editById);
router.delete('/:id', deleteById);


export default router;
