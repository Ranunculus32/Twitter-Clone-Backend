import User from "../models/user_model.js";
import { compare, hashPass } from "../utils/bcryptFunction.js";

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

      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    console.log("User found in the database:", user);

    const isPasswordMatched = await compare(password, user.password);

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

// Function to get all users
export const getAllUsers = async (req, res) => {
  // Retrieve all users from the database send as JSON response
  const users = await User.find();
  res.status(200).json(users);
};

// Function to get a single user by id
export const getOneUser = async (req, res) => {
  const { id } = req.params;

  // Find a user with the given id from db and pass as JSON response
  const foundedUser = await User.findOne({ _id: id });
  res.status(200).json(foundedUser);
};

// Function to get followers of a user
export const getAllFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id
    const foundedUser = await User.findById(id);

    if (!foundedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get all followers of the founded user
    const followers = foundedUser.followers;

    res.json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all the following of a user
export const getAllFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id
    const foundedUser = await User.findById(id);

    if (!foundedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get all users that the founded user is following
    const following = foundedUser.following;

    res.json(following);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to add a follower to a user's followers list
export const postAFollower = async (req, res) => {
  const { id } = req.params;
  const newFollower = req.body;

  try {
    // Find the user who is being followed
    const foundedUser = await User.findOne({ _id: id });
    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the follower to the followers array
    foundedUser.followers.push(newFollower);
    await foundedUser.save();

    res.status(201).json(foundedUser.followers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to add a user to the current user's following list
export const postAFollowing = async (req, res) => {
  const { id } = req.params;
  const newFollowing = req.body;

  try {
    // Find the user in db
    const foundedUser = await User.findOne({ _id: id });
    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the following to the user following array
    foundedUser.following.push(newFollowing);
    await foundedUser.save();

    res.status(201).json(foundedUser.following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to remove a following from the current user's following list
export const deleteAFollowing = async (req, res) => {
  const { id, followingId } = req.params;

  try {
    // Find the user by id
    const foundedUser = await User.findOne({ _id: id });
    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the followingId from the user following array
    const newFollowing = foundedUser.following.filter(
      (following) => following.followingId !== followingId
    );

    // Update the user's following array with the newFollowing array
    foundedUser.following = newFollowing;
    await foundedUser.save();

    res.status(200).json(foundedUser);
  } catch (error) {
    console.error("Error deleting following:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to remove a follower from the current user's followers list
export const deleteAfollower = async (req, res) => {
  const { id, followerId } = req.params;

  try {
    // Find the user by id
    const foundedUser = await User.findOne({ _id: id });

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the followerId from the user follower array
    const newFollower = foundedUser.followers.filter(
      (follower) => follower.followerId !== followerId
    );

    // Update the user's followers array with the newFollower array
    foundedUser.followers = newFollower;
    await foundedUser.save();

    res.status(200).json(foundedUser);
  } catch (error) {
    console.error("Error deleting following:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to update a user's information
export const updateUser = async (req, resp) => {
  const { id } = req.params;
  await User.updateMany({ _id: id }, req.body);
  // send updated user info as response
  const updatedUser = await User.findById(id);
  resp.status(200).json(updatedUser);
};
