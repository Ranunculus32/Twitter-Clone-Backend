import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";
import Post from "./Post.js";

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const port = 8000;

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Session and Flash Middleware
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

// Route to create a new post
app.post('/posts', async (req, res) => {
  try {
    const { author, content } = req.body;
    const post = new Post({ author, content });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

// Start the server
app.listen(port, () =>
  console.log(`Backend server is running on port ${port}!`)
);
