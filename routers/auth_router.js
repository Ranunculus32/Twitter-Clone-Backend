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
  isRegisterUser(req, res, next); // Calls middleware to handle registration
});

// POST request for user login
router.post("/login", (req, res, next) => {
  console.log("Accessed Login route");
  isAuthenticatedUser(req, res, next); // Calls middleware to handle login
});

// POST request for user logout
router.post("/logout", (req, res, next) => {
  console.log("Accessed Logout route");
  logoutUser(req, res, next); // Calls middleware to handle logout
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

export default router;