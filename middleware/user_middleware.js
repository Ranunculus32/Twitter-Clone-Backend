import bcrypt from "bcrypt";
import User from "../models/user_model.js";

const generateUserId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return timestamp + random;
};

export const isRegisterUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken.",
      });
    }

    console.log("Attempting to register user:", username);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      userId: generateUserId(),
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

      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    console.log("User found in the database:", user);

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

    req.session.user = { username, userId: user.userId };
    res.status(200).json({ success: true, message: "Login successful" });
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
