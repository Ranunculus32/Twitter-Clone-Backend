import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import userRouter from "./routers/user_router.js";
import tweetRouter from "./routers/tweet_router.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";


dotenv.config();


const port = process.env.PORT || 3000;

const app = express();
app.use(cors());


// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware
app.use(express.json());
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

// Home Route
app.get("/", (req, res) =>{
  res.send("Let's Tweet!");
});

// User Routes
app.use("/users", userRouter);

// Tweet Routes
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
