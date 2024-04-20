import express from "express";
import Post from "../models/postSchema.mjs";


const router = express.Router();


// route to get all posts

router.get("/posts", async (req, res) => {

    try {

        const posts = await Post.find();

        console.log(posts);

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;