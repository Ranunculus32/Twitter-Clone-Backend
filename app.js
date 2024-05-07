import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import userRouter from "./routers/user_router.js";
import searchRoute from "./routers/SearchRoute.js";
import postsRoute from "./routers/PostRoute.js";
import commentsRoute from "./routers/CommentRoute.js";
import tweetRouter from "./routers/tweet_router.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(cors());

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
app.use('/api', searchRoute);
app.use('/post', postsRoute);
app.use('/comment', commentsRoute);
app.use("/tweets", tweetRouter);


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
