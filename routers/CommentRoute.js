import express from "express";
import Comment from "../models/Comment.js";


const router = express.Router();

// Route to create a new comment on a post
router.post('/posts/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, author, content, htmlContent } = req.body;

        // Create a new comment
        const newComment = new Comment({
            postId,
            userId,
            author,
            content,
            htmlContent,
        });

        // Save the comment to the database
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to reply to a comment
router.post('/comments/:commentId/replies', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, author, content, htmlContent } = req.body;

        // Find the parent comment
        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }

        // Create a new reply
        const newReply = new Comment({
            postId: parentComment.postId,
            userId,
            author,
            content,
            htmlContent,
        });

        // Add the reply to the parent comment's replies array
        parentComment.replies.push(newReply._id);
        await parentComment.save();

        // Save the reply to the database
        const savedReply = await newReply.save();
        res.status(201).json(savedReply);
    } catch (error) {
        console.error('Error replying to comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;