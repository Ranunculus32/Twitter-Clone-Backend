import express from "express";
import {
  isAuthenticatedUser,
  isRegisterUser,
  logoutUser,
} from "../middleware/user_middleware.js";

const router = express.Router();


// POST request for user registration
router.post("/register", (req, res, next) => {
  console.log("Accessed Register route");
  isRegisterUser(req, res, next);  // Calls middleware to handle registration
});

// POST request for user login
router.post("/login", (req, res, next) => {
  console.log("Accessed Login route");
  isAuthenticatedUser(req, res, next);  // Calls middleware to handle login
});

// POST request for user logout
router.post("/logout", (req, res, next) => {
  console.log("Accessed Logout route");
  logoutUser(req, res, next);  // Calls middleware to handle logout
});

// GET request to indicate the registration page (informational)
router.get("/register", (req, res) => {
  res.json({ message: "This is the Registration page." });
});

// GET request to indicate the login page (informational)
router.get("/login", (req, res) => {
  res.json({ message: "This is the Login page." });
});

// GET request to indicate the logout page (informational)
router.get("/logout", (req, res) => {
  res.json({ message: "This is the Logout page." });
});

// route to get all users
router.get("/", getAllUsers);

// route to get a user
router.get("/:id", getOneUser);

// route to get followers
router.get("/:id/followers", getAllFollowers);

// route to get following
router.get("/:id/following", getAllFollowing);

// Route to add a new follower to a user
router.post("/:id/followers", postAFollower);

// Route to add a new following to a user
router.post("/:id/following", postAFollowing);

// Route to delete a follower
router.delete("/:id/followers/:followerId", deleteAfollower);

// Route to delete a following
router.delete("/:id/following/:followingId", deleteAFollowing);

// route to update a user
router.put("/:id", updateUser);



export default router;
