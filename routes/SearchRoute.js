import express from "express";
import User from "../models/userSchema.mjs";
/* import Post from "../models/postSchema.mjs"; */


// IMPORTANT NOTE: When you want to use certain db, change it in .env file at the end of connection string 
// DON'T FORGET!!
// Change query requirements for posts if needed or take it out altogether and just search trough users


const router = express.Router();


router.get('/search', async (req, res) => {


    let query = req.query.q;
    query = String(query || '').trim().toLowerCase();

    try {

        const users = await User.find(); // Use .lean() to ensure plain JavaScript objects are returned
        /*  const posts = await Post.find(); */


        const filteredUsers = users.filter(user => user.fullName && user.fullName.toLowerCase().includes(query));
        /*  const filteredPosts = posts.filter(post => post.content && post.content.toLowerCase().includes(query)); */

        // Log the search results to the console
        console.log(filteredUsers);
        /* console.log(filteredPosts); */


        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;