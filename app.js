import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import userRouter from "./routers/user_router.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;
dotenv.config();

// MongoDBStore with session
const MongoDBStoreSession = MongoDBStore(session);

// Middleware

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

// Enable CORS for specific origins and methods
app.use(
  cors({
    origin: "'http://localhost:5173",
    methods: ["GET", "POST"], //
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());  

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
