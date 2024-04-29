import express from "express";
import {
  isAuthenticatedUser,
  isRegisterUser,
  logoutUser,
} from "../controllers/user_middleware.js";

const router = express.Router();

router.post("/register", isRegisterUser);
router.post("/login", isAuthenticatedUser);
router.post("/logout", logoutUser);

export default router;
