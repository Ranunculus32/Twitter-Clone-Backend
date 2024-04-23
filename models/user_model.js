import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted._v;
  },
});

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
    type: [],
  },
  following: {
    type: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
