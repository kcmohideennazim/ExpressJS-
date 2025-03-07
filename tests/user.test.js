const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../src/routes/user");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("User API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
      age: 25
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("John Doe");
  });

  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a user", async () => {
    const newUser = await request(app).post("/users").send({
      name: "Jane Doe",
      email: "jane@example.com",
      age: 30
    });

    const res = await request(app)
      .put(`/users/${newUser.body._id}`)
      .send({ age: 35 });

    expect(res.statusCode).toBe(200);
    expect(res.body.age).toBe(35);
  });
});
