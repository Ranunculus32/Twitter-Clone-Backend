import express from "express";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const router = express.Router();

// Route to create a new comment on a post
router.post('/:postId', async (req, res) => {
    try {
        const { content, userId, username } = req.body;
        const { postId } = req.params;

        if (!userId || !postId || !content) {
            return res.status(400).json({ error: 'userId, postId, and content are required' });
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
            username,
            reply: []
        });

        const savedComment = await newComment.save();

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.comments.push(savedComment._id);
        await post.save();

        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to reply on a comment
router.post('/:commentId/reply', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content, username } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ error: 'userId and content are required' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        /*   if (!comment.reply) {
              comment.reply = [];
          }
   */
        const newReply = new Comment({
            content,
            postId: comment.postId,
            userId,
            username,
            isReply: true,
        });

        const savedReply = await newReply.save();

        comment.reply.push(savedReply._id);
        await comment.save();

        res.status(201).json(savedReply);
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch comments for a post
router.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId, isReply: false })
            .populate('userId', 'username fullName')
            .populate({
                path: 'reply',
                populate: { path: 'userId', select: 'username fullName' }
            });

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a comment
router.delete('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find and delete the comment
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.isReply) {
            const parentComment = await Comment.findById(comment.replyTo);
            if (parentComment) {
                parentComment.reply.pull(commentId);
                await parentComment.save();
            }
        } else {

            const post = await Post.findById(comment.postId);
            if (post) {
                post.comments.pull(commentId);
                await post.save();
            }

            await Comment.deleteMany({ _id: { $in: comment.reply } });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a reply
router.delete('/:commentId/reply/:replyId', async (req, res) => {
    try {
        const { commentId, replyId } = req.params;

        // Find and delete the reply
        const reply = await Comment.findByIdAndDelete(replyId);
        if (!reply) {
            return res.status(404).json({ error: 'Reply not found' });
        }

        // Remove the reply from the parent comment
        const parentComment = await Comment.findById(commentId);
        if (parentComment) {
            parentComment.reply.pull(replyId);
            await parentComment.save();
        }

        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error('Error deleting reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
