import express from "express";
import {
  getAllUsers,
  getOneUser,
  getAllFollowers,
  getAllFollowing,
  updateUser,
  postAFollower,
  postAFollowing,
  deleteAFollowing,
  deleteAfollower,
} from "../middleware/profile_middleware.js";

const profileRoute = express.Router();

// route to get all users
profileRoute.get("/", getAllUsers);

profileRoute.get("/:id", getOneUser);

profileRoute.get("/:id/followers", getAllFollowers);
// route to get following
profileRoute.get("/:id/following", getAllFollowing);

// Route to add a new follower to a user
profileRoute.post("/:id/followers", postAFollower);

// Route to add a new following to a user
profileRoute.post("/:id/following", postAFollowing);

// Route to delete a follower
profileRoute.delete("/:id/followers/:followerId", deleteAfollower);

// Route to delete a following
profileRoute.delete("/:id/following/:followingId", deleteAFollowing);

// route to update a user
profileRoute.put("/:id", updateUser);

export default profileRoute;
