import express from "express";
import Comment from "../models/Comment.js";


const router = express.Router();


// Route to create a new comment on a post
router.post('/:postId', async (req, res) => {
    try {
        const { postId } = req.params; // Only postId is needed from params
        const { content } = req.body;



        if (!postId || !content) {
            return res.status(400).json({ error: 'userId, postId, and content are required' });
        }

        const newComment = new Comment({
            content,
            postId,


        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to Reply on a Comment

router.post('/:commentId/reply', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ error: 'userId and content are required' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.reply.push({ userId, content });
        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding reply:', error);
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