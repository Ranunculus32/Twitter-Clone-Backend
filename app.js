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
/* import userRouter from "./routers/user_router.js"; */

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

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

// Connect to MongoDB only in non-test environments
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.error("DB Connection Error:", err));

  // Start the server only in non-test environments
  app.listen(port, () => {
    console.log(`Backend server is running on port ${port}!`);
  });
}

// Routing setup

app.use("/", authRouter); //this is the entry of the app and so must have the root path
app.use("/tweet", tweetRouter);
app.use("/search", searchRoute);
app.use("/comments", commentsRoute);
app.use("/trend", trendRouter);
app.use("/profile", profileRoute);
app.use("/posts", postsRoute);

export default app;
