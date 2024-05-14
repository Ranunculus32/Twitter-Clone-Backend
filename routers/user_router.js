import express from "express";
import {
  isAuthenticatedUser,
  isRegisterUser,
  logoutUser,
  getUserInfo,
} from "../middleware/user_middleware.js";

const router = express.Router();

router.post("/register", isRegisterUser);
router.post("/login", isAuthenticatedUser);
router.post("/logout", logoutUser);
router.get("/username", getUserInfo);

export default router;