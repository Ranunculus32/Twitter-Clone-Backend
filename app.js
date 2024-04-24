import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import userRouter from "./routers/user_router.js";
import searchRoute from "./routers/SearchRoute.js";
import postsRoute from "./routers/PostRoute.js";
import Post from "./model/Post.js";
import dotenv from "dotenv";
<<<<<<< HEAD
import bodyParser from "body-parser";
=======
import cors from "cors";
import Post from "./model/Post.js";

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const port = 8000;
>>>>>>> 45a30cda8ccc3e62285e5c9d1979c1161231fbcd

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

<<<<<<< HEAD
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
=======
// Route to create a new post
app.post('/posts', (req, res) => {
  const newPost = new Post({
      author: req.body.author,
      text: req.body.text
>>>>>>> 45a30cda8ccc3e62285e5c9d1979c1161231fbcd
  });

  newPost.save().then(post => res.json(post));
});

// Get Posts Route
app.get('/posts', (req, res) => {
  Post.find()
<<<<<<< HEAD
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});


=======
      .sort({ date: -1 })
      .then(posts => res.json(posts));
});




>>>>>>> 45a30cda8ccc3e62285e5c9d1979c1161231fbcd
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
