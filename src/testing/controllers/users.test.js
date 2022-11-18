const express = require("express");
const { expect } = require("helmet");
const { mongoose } = require("mongoose");
const request = require("supertest");

const { app, PORT, HOST, MODE } = require("../../server");
// Only authorised users are allowed to create new users.

//set Timeout
jest.setTimeout(30000);
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe("Without access token", () => {
  it("should return an error, when GET- users", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.statusCode).toBe(401);
  });

  it("should return an error, when GET- users/:id", async () => {
    const response = await request(app).get(
      "/api/v1/users/636e3fe69f8a78dd53cfc5cf"
    );
    expect(response.statusCode).toBe(401);
  });

  it("should return an error, when PUT- users/:id", async () => {
    const response = await request(app).put(
      "/api/v1/users/636e3fe69f8a78dd53cfc5d2"
    );
    expect(response.statusCode).toBe(401);
  });

  it("should return an error, when POST- users/", async () => {
    const newUser = {
      firstName: "Emerson",
      lastName: "Goodyear",
      email: "emerson@test.com",
      password: "1234",
    };
    const response = await request(app).post("/api/v1/users/").send(newUser);

    expect(response.statusCode).toBe(401);
  });
});

describe("Integration test for users api: with access token", () => {
  let token = "";
  const userId = "6370de60106b4a3efa6124f1";

  beforeAll(async () => {
    const authUser = {
      firstName: "Charlie",
      lastName: "Edwards",
      email: "charlie@test.com",
      password: "123456",
    };

    const authResponse = await request(app)
      .post("/api/v1/auth/login")
      .send(authUser);

    token = authResponse.body.token;
  });

  it("should return an array of users with statusCode 200", async () => {
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(1);
    expect(response.statusCode).toBe(200);
  });

  it("Get one user with authorised token", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.data.firstName).toBe("Charlie");

    const data = response.body.data;
    expect(data.__v).toEqual(expect.any(Number));
    expect(data._id).toEqual(expect.any(String));
    expect(data.firstName).toEqual(expect.any(String));
    expect(data.lastName).toEqual(expect.any(String));
    expect(data.email).toEqual(expect.any(String));
    expect(data.approved).toEqual(expect.any(Boolean));
    expect(data.createdAt).toEqual(expect.any(String));
  });

  it("should GET one user but not contain password", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).not.toHaveProperty("password");
  });

  it("should PUT/UPDATE one user approved to false then back to true", async () => {
    let approval = false;

    const response = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ approved: approval })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.approved).toBe(false);

    approval = true;
    const response1 = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ approved: approval })
      .set("Authorization", `Bearer ${token}`);
  });

  it("should not allow PUT/Update to change user password freely", async () => {
    const userId = "636e3fe69f8a78dd53cfc5d2";

    const response = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ password: "6543210" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(401);
  });

  let newUserId = "";
  it("POST/Create one new user", async () => {
    const newUser = {
      firstName: "Emerson",
      lastName: "Goodyear",
      email: "emerson@test.com",
      password: "123456",
    };
    const response = await request(app)
      .post("/api/v1/users/")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`);
    newUserId = response.body.data._id;
    expect(response.statusCode).toBe(200);
  });

  it("Delete one user", async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${newUserId}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response);
  });

  it("should return an error, when GET- users can not access database", async () => {
    mongoose.connection.close();
    const response = await request(app).get("/api/v1/users");
    expect(response.statusCode).toBe(404);
  });
});
