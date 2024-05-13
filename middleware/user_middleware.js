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
    const requiredFields = [
      username,
      password,
      email,
      fullName,
      profession,
      hometown,
      description,
    ];
    const missingFields = requiredFields.filter((field) => !field);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missingFields.join(", ")}.`,
      });
    }

    // Check if the email or username is already registered
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const field = existingUser.username === username ? "Username" : "Email";
      return res.status(400).json({
        success: false,
        message: `${field} is already registered.`,
      });
    }

    // Hash the password with hashSync
    const hashedPassword = hashSync(password, 10); // 10 salt rounds

    // Create a new user object with the hashed password
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

    await newUser.save(); // Save the new user to MongoDB

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      redirect: "/login", // Redirect to login page after registration
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

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Compare the plaintext password with the hashed password
    const isPasswordMatched = compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Set session data
    req.session.user = {
      username,
      userId: user._id,
    };

    res.status(200).json({
      success: true,
      message: "Login successful.",
      redirect: `/homepage`, // Redirect to the user profile page or similar
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
      return res.status(500).json({
        success: false,
        message: "Error logging out.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  });
};
