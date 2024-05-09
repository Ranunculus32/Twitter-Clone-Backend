import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import User from "../models/user_model.js";
const api = supertest(app);

let mongoServer;

beforeEach(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("Login user with wrong credentials", async () => {
  const res = await api.post("/login").send({
    username: "wrongusername",
    password: "wrongpassword",
  });

  expect(res.statusCode).toBe(401);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toBe("Invalid username or password.");
});

test("get all users", async () => {
  const res = await api.get("/users/");
  expect(res.statusCode).toBe(200);
});

test("get all tweets", async () => {
  const res = await api.get("/tweets/");
  expect(res.statusCode).toBe(200);
});

test("Login user with wrong data", async () => {
  const res = await api.post("/login").send({
    email: "nimmy@gmail.com",
    password: "tuwewi",
  });
  expect(res.statusCode).toBe(401);
});

test("Get all followers of a user", async () => {
  // Create a user with some followers
  const user = await User.create({
    username: "testuser",
    password: "testuser",
    email: "testuser@yahoo.com",
    fullName: "test user",
    profession: "test test",
    hometown: "test",
    description: "test under process",
    website: "www.test.com",
    followers: [{ followerId: "follower1" }, { followerId: "follower2" }], //here is 2 follower that will be tested
    following: [],
  });

  const res = await api.get(`/users/${user._id}/followers`);
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(2); // Assuming the user has two followers
});

test("Get all following of a user", async () => {
  // Create a user with some following
  const user = await User.create({
    username: "testuser",
    password: "testuser",
    email: "testuser@yahoo.com",
    fullName: "test user",
    profession: "test test",
    hometown: "test",
    description: "test under process",
    website: "www.test.com",
    followers: [],
    following: [
      { followingId: "following1", username: "following1_username" },
      { followingId: "following2", username: "following2_username" }, //following length 2 will be tested
    ],
  });

  const res = await api.get(`/users/${user._id}/following`);
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(2); // Assuming the user is following two users
});

test("Add a follower to a user", async () => {
  // Create a user
  const user = await User.create({
    username: "testuser",
    password: "testuser",
    email: "testuser@yahoo.com",
    fullName: "test user",
    profession: "test test",
    hometown: "test",
    description: "test under process",
    website: "www.test.com",
    followers: [],
    following: [],
  });

  const newFollowerData = {
    followerId: "follower1",
  };
  const res = await api
    .post(`/users/${user._id}/followers`)
    .send(newFollowerData);

  expect(res.statusCode).toBe(201);
});

test("Test to register user with not passing required fields", async () => {
  const res = await api.post("/register").send({
    username: "raj123",
    password: "raj123",
    email: "raj123@yahoo.com",
    fullName: "raj das",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body).toStrictEqual({
    success: false,
    message: "Fill the required areas.",
  });
});
