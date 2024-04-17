import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";
import User from "./model.js";

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

// Get all users
app.get("/users", async (req, resp) => {
  const users = await User.find();
  resp.status(200).json(users);
});

// Create a new user
app.post("/users", async (req, resp) => {
  const user = new User(req.body);
  const createdUser = await user.save();
  resp.status(201).json(createdUser);
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
