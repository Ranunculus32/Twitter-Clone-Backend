import express from "express";
import Post from "../models/Post.js";
import User from "../models/user_model.js";
import Comment from "../models/Comment.js";
import axios from "axios";

const router = express.Router();

// dog image (cors policy doesnt allow it on frontend side)
router.get('/random-dog-image', async (req, res) => {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching random dog image:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to create a new post
router.post('/create/:userId', async (req, res) => {
    try {

        const { userId } = req.params;
        const newPost = new Post({
            content: req.body.content,
            userId
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate('userId');


        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const comments = await Comment.find({ postId: post._id })
            .sort({ createdAt: -1 })
            .populate('userId')
            .exec();

        const responseData = {
            post: post,
            comments: comments
        };

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).send(error.message);
    }
});



// GET all posts 

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    select: 'username fullName' // Populate userId with username and fullName
                }
            })
            .populate('userId', 'username fullName');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;