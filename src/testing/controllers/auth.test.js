const { mongoose } = require("mongoose");
const request = require("supertest");
const { app, PORT, HOST, MODE } = require("../../server");
// Only authorised users are allowed to create new users.

//set Timeout
jest.setTimeout(30000);

let token = "";
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

/****** without access token */
describe("Authentication create user with valid fields and info", () => {
  //userId
  let newUserId = "";
  let newUserToken = "";
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

  let userDetails = {};
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

    newUserId = response.body._id;
    newUserToken = response.body.token;

    expect(response.statusCode).toBe(200);
    expect(response.body.approved).toBe(false);
  });

  it("should not be allowed to log in with wrong password", async () => {
    const newUser = {
      email: "emerson@test.com",
      password: "12345644",
    };
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
      .get(`/api/v1/auth/me/${newUserId}`)
      .set("Authorization", `Bearer ${newUserToken}`);

    expect(response.body.data.firstName).toBe("Emerson");
  });

  it("Delete one user", async () => {
    console.log(`token ${token}`);
    const response = await request(app)
      .delete(`/api/v1/users/${newUserId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

// login
describe("the login methods and error", () => {
  it("should retun an error if there is no email or password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ password: "6543210" });

    expect(response.statusCode).toBe(400);
  });

  it("should return an error if email is invalid", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ emai: "abcdefgedhdf@gmail.com", password: "123456" });

    expect(response.statusCode).toBe(400);
  });
});

//*** Change password */
describe("the change password controller", () => {
  it("response with a message if a user tries tries to change a password of another person's email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/changepassword")
      .send({
        email: "george@test.com",
        currentPassword: "123456",
        newPassword: "654321",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });

  it("response with an error message if current password is invalid", async () => {
    const response = await request(app)
      .put("/api/v1/auth/changepassword")
      .send({
        email: "charlie@test.com",
        currentPassword: "fakepassword",
        newPassword: "newpassmate",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.error).toBe("Not authorised");
  });

  it("respone with 200 if password is changed", async () => {
    const response = await request(app)
      .put("/api/v1/auth/changepassword")
      .send({
        email: "charlie@test.com",
        currentPassword: "123456",
        newPassword: "123456",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.success).toBe(true);
    //change back to original password
    const changeback = await request(app)
      .put("/api/v1/auth/changepassword")
      .send({
        email: "charlie@test.com",
        currentPassword: "123456",
        newPassword: "123456",
      })
      .set("Authorization", `Bearer ${token}`);
  });
});

describe("forgot password controller", () => {
  it("should return No such email if wrong email is enterer", async () => {
    const response = await request(app)
      .post("/api/v1/auth/forgotpassword")
      .send({ email: "fake@text.com" });

    expect(response.body.error).toBe("No such email");
  });

  it("should return status 200 and message", async () => {
    const response = await request(app)
      .post("/api/v1/auth/forgotpassword")
      .send({ email: "henry@test.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe("Reset password email sent");
  });
});
