import express from "express";
import {
  isAuthenticatedUser,
  isRegisterUser,
  logoutUser,
  getAllUsers,
  getOneUser,
  postAUser,
  getAllFollowers,
  getAllFollowing,
  updateUser,
} from "../middleware/user_middleware.js";
import User from "../models/user_model.js";

const router = express.Router();

router.post("/register", isRegisterUser);
router.post("/login", isAuthenticatedUser);
router.post("/logout", logoutUser);

// route to get all users
router.get("/", getAllUsers);

// route to get a user
router.get("/:id", getOneUser);

// route to create a new user
router.post("/", postAUser);

// route to get followers
router.get("/:id/followers", getAllFollowers);

// route to get following
router.get("/:id/following", getAllFollowing);

// route to update a user
router.put("/users/:id", updateUser);

export default router;
