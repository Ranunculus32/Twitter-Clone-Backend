import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/UserRoute.js"
import searchRoute from "./routes/SearchRoute.js"
import postsRoute from "./routes/PostRoute.js"

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const port = 8000;

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use('/', userRoutes);
app.use('/api', searchRoute);
app.use('/feed', postsRoute);

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





// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));



// Start the server
app.listen(port, () =>
  console.log(`Backend server is running on port ${port}!`)
);


