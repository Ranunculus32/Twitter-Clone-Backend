import bcrypt from "bcrypt";
import User from ("../models/user_model");

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

    console.log("User found in the database:", user);

    if (user) {
      console.log("Hashed password during login:", user.password);

      const isPasswordMatched = await bcrypt.compare(
        password.trim(),
        user.password
      );

      if (isPasswordMatched) {
        req.session.user = { username, userId: user.userId };
        // Handle successful authentication, maybe respond with a token
        res.status(200).json({ success: true, message: "Login successful" });
      } else {
        console.error(
          "Incorrect password. Hashed:",
          user.password,
          "Input:",
          password.trim()
        );
        res.status(401).json({ success: false, message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error during user authentication:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error upon login" });
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
