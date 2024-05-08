import express from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/user_router.js";

dotenv.config(); 

const app = express();
const port = 4000;

// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS with correct configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Ensure correct origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials
  })
);
app.options("*", cors()); // Handle preflight requests

import userRouter from "./routers/user_router.js";
import searchRoute from "./routers/SearchRoute.js";
import postsRoute from "./routers/PostRoute.js";
import commentsRoute from "./routers/CommentRoute.js";
import tweetRouter from "./routers/tweet_router.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import profileRoute from "./routers/profileRoute.js";
import trendRouter from "./routers/trendRoute.js";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(cors());


// Session and Flash Middleware with correct secret
const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URL, // Ensure correct MongoDB URI
  collection: "sessions",
});

// Ensure the secret key is provided for express-session
app.use(
  session({
    secret: process.env.secretKey, // Use the environment variable
    resave: false,
    saveUninitialized: true,
    store, // Use MongoDBStoreSession for session persistence
  })
);


// Use userRouter for routing
app.use("/", userRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.error("DB Connection Error:", err));

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
