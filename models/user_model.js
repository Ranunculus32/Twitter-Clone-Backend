import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
  },
  hometown: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 300, // Maximum 300 characters
    required: true,
  },
  website: {
    type: String,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
