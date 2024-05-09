import User from "../models/user_model.js";
import { hashSync, compareSync } from "bcrypt";

// Registration endpoint
export const isRegisterUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      fullName,
      profession,
      hometown,
      description,
      website,
    } = req.body;

    // Check for required fields
    if (
      !username ||
      !password ||
      !email ||
      !fullName ||
      !profession ||
      !hometown ||
      !description ||
      !website
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required areas.",
      });
    }

    // Check if the email or username is already registered
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already registered.",
      });
    }

    const hashedPassword = hashSync(password, 10); // 10 salt rounds

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fullName,
      profession,
      hometown,
      description,
      website,
      createdAt: new Date(),
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      redirect: "/login",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
};

// Authentication endpoint
export const isAuthenticatedUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const isPasswordMatched = compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    req.session.user = { username, userId: user._id };
    res.status(200).json({
      success: true,
      message: "Login successful.",
      redirect: `/users/${user._id}`,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

// Logout endpoint
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ success: false, message: "Error logging out." });
    } else {
      res.status(200).json({ success: true, message: "Logout successful." });
    }
  });
};
