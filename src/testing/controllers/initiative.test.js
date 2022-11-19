const { expectCt } = require("helmet");
const { mongoose } = require("mongoose");
const request = require("supertest");
const { app, PORT, HOST, MODE } = require("../../server");
// Only authorised users are allowed to create new users.

//set Timeout
jest.setTimeout(30000);
let token = "";
let ticket_obj_id = "";
let ticket_id = "";
beforeAll(async () => {
  const authUser = {
    firstName: "Charlie",
    lastName: "Edwards",
    email: "charlie@test.com",
    password: "123456",
  };

  const authResponse = await request(app).post("/api/v1/auth/login").send({
    email: authUser.email,
    password: authUser.password,
  });

  token = authResponse.body.token;
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

let userId = "";

describe("the GET all initiatives", () => {
  it("should return error if no token is passed", async () => {
    const response = await request(app).get("/api/v1/initiatves/");

    expect(response.statusCode).toBe(404);
  });

  it("should return an array of tickets", async () => {
    const response = await request(app)
      .get("/api/v1/initiatives/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.data.length).toBeGreaterThan(1);
    expect(response.statusCode).toBe(200);
    userId = response.body.data[0]._id;
  });
});

describe("the GET one initiative", () => {
  it("should return an error if not token", async () => {
    const response = await request(app).get(`/api/v1/initiatives/${userId}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not Authorized");
  });

  it("should return a ticket when a token is sent", async () => {
    const response = await request(app)
      .get(`/api/v1/initiatives/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.ticket_id).toBe("TSM-711");
  });

  it("should return error if _id can not be found", async () => {
    const response = await request(app)
      .get("/api/v1/initiatives/637819e31d460511ecc643bf")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(
      "Can not find initiative id: 637819e31d460511ecc643bf"
    );
  });
});

describe("the updateInitiatives route", () => {
  it("should return an error without a token", async () => {
    const response = await request(app)
      .put(`/api/v1/initiatives/${userId}`)
      .send({ description: "this is a test only" });
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not Authorized");
  });

  it("should return the updated data when a token used", async () => {
    const response = await request(app)
      .put(`/api/v1/initiatives/${userId}`)
      .send({ description: "this is a test only" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data._id).toBe(userId);
  });

  it("should return error if _id can not be found", async () => {
    const response = await request(app)
      .put("/api/v1/initiatives/637819e31d460511ecc643bf")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe("Initiative id not found");
  });
});
