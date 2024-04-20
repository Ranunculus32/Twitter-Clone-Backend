import express from "express";
import User from "../models/userSchema.mjs";


const router = express.Router();


// route to get all users
router.get("/users", async (req, resp) => {
    const users = await User.find();
    resp.status(200).json(users);
});

// route to get a user
router.get("/users/:id", async (req, resp) => {
    const { id } = req.params;
    const dog = await User.findOne({ _id: id });
    resp.status(200).json(dog);
});

// route to create a new user
router.post("/users", async (req, resp) => {
    const user = new User(req.body);
    try {
        const createdUser = await user.save();
        resp.status(201).json(createdUser);
    } catch (error) {
        console.error("Error creating new user:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// route to get followers
router.get("/users/:id/followers", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by id
        const foundedUser = await User.findById(id);

        if (!foundedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // get all followers from the founded user
        const followers = foundedUser.followers;

        res.json(followers);
    } catch (error) {
        console.error("Error fetching followers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// route to get following
router.get("/users/:id/following", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by id
        const foundedUser = await User.findById(id);

        if (!foundedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // get all following from the founded user
        const following = foundedUser.following;

        res.json(following);
    } catch (error) {
        console.error("Error fetching following:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;