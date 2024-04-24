import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import userRouter from "./routers/user_router.js";
import searchRoute from "./routers/SearchRoute.js";
import postsRoute from "./routers/PostRoute.js";
import Post from "./model/Post.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
dotenv.config();

// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json


// Session and Flash Middleware
const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

// Routes
app.use("/users", userRouter);
/* app.use('/', userRoutes); */
app.use('/api', searchRoute);
app.use('/feed', postsRoute);

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

export default app;
