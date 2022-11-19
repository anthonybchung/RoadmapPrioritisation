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
