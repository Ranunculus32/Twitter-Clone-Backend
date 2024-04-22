import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";
import Post from "./model/Post.js";

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
app.post('/posts', (req, res) => {
  const newPost = new Post({
      author: req.body.author,
      text: req.body.text
  });

  newPost.save().then(post => res.json(post));
});

// Get Posts Route
app.get('/posts', (req, res) => {
  Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts));
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
