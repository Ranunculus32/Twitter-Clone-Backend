import express from "express";
import Comment from "../models/Comment.js";


const router = express.Router();


// Route to create a new comment on a post
router.post('/', async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        if (!userId || !postId || !content) {
            return res.status(400).json({ error: 'userId, postId, and content are required' });
        }

        const newComment = new Comment({
            postId,
            userId,
            content
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:postId', async (req, res) => {
    try {

        const { postId } = req.params;

        const comments = await Comment.find({ postId });

        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




export default router;