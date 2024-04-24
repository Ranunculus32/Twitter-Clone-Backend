import express from "express";
import Post from "../models/Post.js";


const router = express.Router();

// Route to create a new post
router.post('/posts', (req, res) => {
    const newPost = new Post({
        author: req.body.author,
        text: req.body.text
    });

    newPost.save().then(post => res.json(post));
});


// Route to get all posts

router.get("/posts", async (req, res) => {

    try {

        const posts = await
            Post.find()
                .sort({ date: -1 })
                .then(posts => res.json(posts));
        console.log(posts);


    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;