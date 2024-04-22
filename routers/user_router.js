import express from "express";
import {
  isAuthenticatedUser,
  isRegisterUser,
  logoutUser,
} from "../middleware/user_middleware.js";

const router = express.Router();
router.get("/register", isRegisterUser);
router.post("/register", isRegisterUser);

router.get("/login");
router.post("/login", isAuthenticatedUser);

router.get("/logout", logoutUser);
router.post("/logout", logoutUser);

export default router;
