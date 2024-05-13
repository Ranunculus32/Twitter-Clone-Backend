import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import searchRoute from "./routers/SearchRoute.js";
import postsRoute from "./routers/PostRoute.js";
import commentsRoute from "./routers/CommentRoute.js";
import tweetRouter from "./routers/tweet_router.js";
import dotenv from "dotenv";
import cors from "cors";
import profileRoute from "./routers/profileRoute.js";
import trendRouter from "./routers/trendRoute.js";
import userRouter from "./routers/user_router.js";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
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
app.use("/", userRouter);
app.use("/users", profileRoute);
app.use("/api", searchRoute);
app.use("/post", postsRoute);
app.use("/comment", commentsRoute);
app.use("/tweets", tweetRouter);
app.use("/tweets", trendRouter);

// Connect to MongoDB only in non-test environments
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.log(err));

  // Start the server only in non-test environments
  app.listen(port, () =>
    console.log(`Backend server is running on port ${port}!`)
  );
}

export default app;
