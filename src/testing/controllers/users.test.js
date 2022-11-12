const express = require("express");
const { expectCt } = require("helmet");
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
  it("GET should return an error", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.statusCode).toBe(401);
  });

  it("Get one user return an error", async () => {
    const response = await request(app).get(
      "/api/v1/users/636e3fe69f8a78dd53cfc5cf"
    );
    expect(response.statusCode).toBe(401);
  });

  it("Update/PUT one user return an error", async () => {
    const response = await request(app).put(
      "/api/v1/users/636e3fe69f8a78dd53cfc5d2"
    );
    expect(response.statusCode).toBe(401);
  });

  it("POST one user return error", async () => {
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

  beforeAll(async () => {
    const authUser = {
      firstName: "Anthony",
      lastName: "Chung",
      email: "anthony.chung@test.com",
      password: "123456",
    };

    const authResponse = await request(app)
      .post("/api/v1/auth/login")
      .send(authUser);

    token = authResponse.body.token;
  });

  it("GET should return all users with authorised token", async () => {
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(1);
    expect(response.statusCode).toBe(200);
  });

  it("Get one user with authorised token", async () => {
    const response = await request(app)
      .get("/api/v1/users/636e3fe69f8a78dd53cfc5cf")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.data.firstName).toBe("Anthony");

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
    const userId = "636e3fe69f8a78dd53cfc5cf";
    const response = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).not.toHaveProperty("password");
  });

  it("should PUT/UPDATE one user approved to true", async () => {
    const userId = "636e3fe69f8a78dd53cfc5d2";
    const approval = false;

    const response = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ approved: approval })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.approved).toBe(false);
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
});
