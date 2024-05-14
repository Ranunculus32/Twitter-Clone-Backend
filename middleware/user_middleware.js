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
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Fill the required areas.",
      });
    }

    // Check if the email or username is already registered
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username is already registered.',
      });
    }


    // Hash the password with hashSync
    const hashedPassword = hashSync(password, 10); // 10 salt rounds

    console.log("Attempting to register user:", username);
    console.log("Request Body:", req.body);


    // Create a new user object with the hashed password
    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
      email,
      fullName,
      profession,
      hometown,
      description,
      website,
      createdAt: new Date(),
    });

    await newUser.save(); // Save the new user to MongoDB

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      redirect: '/login', // Redirect to login page after registration
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration.',
    });
  }
};


export const isAuthenticatedUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username in MongoDB
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Synchronously compare the plaintext password with the hashed password
    const isPasswordMatched = compareSync(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    req.session.user = { username: user.username, userId: user._id }; // Set session data
    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: { username: user.username, userId: user._id },
      redirect: "/homepage", // Redirect to homepage
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};



export const getUserInfo = async (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({
        success: true,
        user: req.session.user
    });
  } else {
      res.status(401).json({
          success: false,
          message: 'Not authenticated'
      });
  }}




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