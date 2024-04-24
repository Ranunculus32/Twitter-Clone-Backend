import express from "express";
import Post from "../models/Post.js";
import User from "../models/user_model.js";


const router = express.Router();

// Route to create a new post
/* router.post('/posts', (req, res) => {
    const newPost = new Post({
        author: req.body.author,
        content: req.body.content
    });

    newPost.save().then(post => res.json(post));
}); */

router.post('/posts', async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.author });
        console.log('Request Body:', req.body);


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newPost = new Post({
            userId: user._id, // Use the user's _id
            content: req.body.content
        });


        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all posts

/* router.get("/posts", async (req, res) => {

    try {

        const posts = await Post.find()
            .populate('author', 'username')
            .sort({ date: -1 })
            .then(posts => res.json(posts));



    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); */
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
            /* .populate('username') */  // Populate the author field with only the username
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;