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

describe("the get estimation route", () => {
  it("should return an error when no token is passed", async () => {
    const response = await request(app).get(
      `/api/v1/estimations/${ticket_obj_id}`
    );

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not Authorized");
  });

  it("should return an estimation ticket when a token is used", async () => {
    const response = await request(app)
      .get(`/api/v1/estimations/${ticket_obj_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.ticket_id).toBe(ticket_id);
  });

  it("should return an error if there is no matching id", async () => {
    const response = await request(app)
      .get(`/api/v1/estimations/6qwe19e31d46051aecc622bf`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      `Invalid Resource(_id): 6qwe19e31d46051aecc622bf`
    );
  });
});

describe("the updateEstimation route", () => {
  it("should return an error when no token is passed", async () => {
    const response = await request(app).put(
      `/api/v1/estimations/updateEstimation/${ticket_obj_id}`
    );
    expect(response.statusCode).toBe(401);
  });

  it("return error if ticket not found", async () => {
    const response = await request(app)
      .put(`/api/v1/estimations/updateEstimation/637819e31d46051aecc622bf`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe("Initiative id not found");
  });

  it("returns 200 when a valid ticket is updated", async () => {
    const response = await request(app)
      .put(`/api/v1/estimations/updateEstimation/63639f80432366b44f6176e5`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("the update estimated route", () => {
  it("should return an error if no token is passed", async () => {
    const response = await request(app).put(
      "/api/v1/estimations/updateEstimated/63639f80432366b44f6176e5"
    );

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not Authorized");
  });

  it("should return statusCode 200 and success true", async () => {
    const response = await request(app)
      .put("/api/v1/estimations/updateEstimated/63639f80432366b44f6176e5")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return an error if ticket can not be found", async () => {
    const response = await request(app)
      .put("/api/v1/estimations/updateEstimated/63639f80432366b44f8886e5")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body.success).toBe(false);
  });
});

describe("the create Estimation lifecycle", () => {
  it("should return an error if no token is passed", async () => {
    const response = await request(app).put(
      `/api/v1/estimations/createEstimation/`
    );
    expect(response.statusCode).toBe(401);
  });

  it("should return statusCode 200 when token and array is passed", async () => {
    const response = await request(app)
      .put("/api/v1/estimations/createEstimation/")
      .send({
        selectedData: ["63639f80432366b44f6176e5", "63639f80432366b44f6176e6"],
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
