import bcrypt from "bcrypt";
import User from "../models/user_model.js";

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
    const hashedPassword = await bcrypt.hash(password, 10);

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

    /*  console.log("Request body:", req.body); */

    const user = await User.findOne({ username });

    if (!user) {
      // Delay response to prevent username enumeration attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    /*  console.log("User found in the database:", user); */

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

//function to get all users
export const getAllUsers = async (req, resp) => {
  const users = await User.find();
  resp.status(200).json(users);
};

//function to get a user
export const getOneUser = async (req, resp) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  resp.status(200).json(user);
};

//function to post a user
export const postAUser = async (req, resp) => {
  const user = new User(req.body);
  try {
    const createdUser = await user.save();
    resp.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating new user:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

//function to get followers
export const getAllFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id
    const foundedUser = await User.findById(id);

    if (!foundedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // get all followers from the founded user
    const followers = foundedUser.followers;

    res.json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//function to get following
export const getAllFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id
    const foundedUser = await User.findById(id);

    if (!foundedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // get all following from the founded user
    const following = foundedUser.following;

    res.json(following);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//function to update a user
export const updateUser = async (req, resp) => {
  const { id } = req.params;
  await User.updateMany({ _id: id }, req.body);
  const updatedUser = await User.findById(id);
  resp.status(200).json(updatedUser);
};
