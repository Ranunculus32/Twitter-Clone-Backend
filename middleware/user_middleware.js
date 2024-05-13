import bcrypt from "bcrypt";
import User from "../models/user_model.js";
import { hashPass, compare } from "../utils/bcryptFunction.js";

export const isRegisterUser = async (req, res, next) => {
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

    // Validate required fields
    if (!email || !fullName || !password || !description || !website) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    console.log("Attempting to register user:", username);
    const hashedPassword = await hashPass(password);

    console.log("Request Body:", req.body);

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
    console.log("User registered successfully");
    res.status(201).json({
      success: true,
      message: "Registration successful. Redirecting to login page.",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error during user registration.",
    });
  }
};

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("Request body:", req.body);

    const user = await User.findOne({ username });

    if (!user) {
      // Delay response to prevent username enumeration attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("User not found in the database."); // Add this line
      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    console.log("User found in the database:", user); // Add this line

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      // Delay response to prevent brute-force attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.error(
        "Incorrect password. Hashed:",
        user.password,
        "Input:",
        password
      );

      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    req.session.user = { username, userId: user._id };
    console.log("User ID:", user._id); // Add this line
    res.status(200).json({ success: true, message: "Login successful", userId: user._id });

  } catch (error) {
    console.error("Error during user authentication:", error);
    res.status(500).json({
      success: false,
      message: "Server error upon login",
    });
  }
};


export const logoutUser = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ success: false, message: "Error logging out" });
    } else {
      res.status(200).json({ success: true, message: "Logout successful" });
    }
  });
};
