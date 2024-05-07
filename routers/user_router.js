import express from "express";
import {
  isAuthenticatedUser,
  isRegisterUser,
  logoutUser,
  getAllUsers,
  getOneUser,
  getAllFollowers,
  getAllFollowing,
  updateUser,
  postAFollower,
  postAFollowing,
  deleteAFollowing,
  deleteAfollower,
} from "../middleware/user_middleware.js";

const router = express.Router();

router.post("/register", isRegisterUser);
router.post("/login", isAuthenticatedUser);
router.post("/logout", logoutUser);

// route to get all users
router.get("/", getAllUsers);

router.get("/:id", getOneUser);

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
