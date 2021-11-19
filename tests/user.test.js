const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "demo",
  email: "doeJohn@gmail.com",
  password: "niqedoieqn",
  phone: "0980983092",
  tokens: [{ token: jwt.sign({ _id: userOneId }, "thisisthesecretkey") }],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("should sign up a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "sample",
      email: "praveesh21@gmail.com",
      password: "dbweijbubvb",
      phone: "9829384916",
    })
    .expect(201);
});

test("should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("should not login non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "userOne.email",
      password: userOne.password,
    })
    .expect(404);
});

test("should get profile to authorised user", async () => {
  console.log(userOne.tokens[0].token);
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile to unauthorised user", async () => {
  await request(app).get("/users/me").send().expect(401);
});
