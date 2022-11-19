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

describe("get all estimation route", () => {
  it("should return error if no valid token", async () => {
    const response = await request(app).get("/api/v1/estimations/");
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not Authorized");
  });

  it("get an array of estimation", async () => {
    const response = await request(app)
      .get("/api/v1/estimations/")
      .set("Authorization", `Bearer ${token}`);

    ticket_obj_id = response.body.data[0]._id;
    ticket_id = response.body.data[0].ticket_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(1);
  });
});
