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

/****** without access token */
describe("Authentication create user with valid fields and info", () => {
  //userId
  let userId = "";
  let token = "";
  //register user is public.
  it("should return an error requesting missing input field", async () => {
    const newUser = {
      firstName: "Emerson",
      lastName: "Goodyear",
      //email: "emerson@test.com",
      password: "1234",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe("Please enter an email address");
  });

  it("should return error password less than 6 characters", async () => {
    const newUser = {
      firstName: "Emerson",
      lastName: "Goodyear",
      email: "emerson@test.com",
      password: "1234",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe("Password must be over 6 character long");
  });

  it("should return user details after successful registration and approve is false", async () => {
    const newUser = {
      firstName: "Emerson",
      lastName: "Goodyear",
      email: "emerson@test.com",
      password: "123456",
    };
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    userId = response.body._id;
    token = response.body.token;

    expect(response.statusCode).toBe(200);
    expect(response.body.approved).toBe(false);
  });

  it("should be not be allowed to log in with wrong password", async () => {
    const newUser = {
      email: "emerson@test.com",
      password: "12345644",
    };
    console.log(`token: ${token}`);
    console.log(`id: ${userId}`);
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(newUser);
    expect(response.body.error).toBe("Not authorised");
  });

  it("should return the users info", async () => {
    const newUser = {
      firstName: "Emerson",
      lastName: "Goodyear",
      email: "emerson@test.com",
    };

    const response = await request(app)
      .get(`/api/v1/auth/me/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.data.firstName).toBe("Emerson");
  });
});
