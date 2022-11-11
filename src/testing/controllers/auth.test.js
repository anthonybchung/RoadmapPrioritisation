const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Description: Forgot passowrd
// Route: POST /api/v1/auth/forgotpassword
// Access: Public
// user enters an email.
// 1. verify email
//    a: returns statusCode: 404 and error message if no email is found.
//    b: create resetToken once email is found.
describe('POST /api/v1/auth/forgotpassword', () => {
  // it('should respond No such email', async () => {
  //   const res = await request(app).post('/api/v1/auth/forgotpassword').send({
  //     email: 'fakeNoOne@fake.com',
  //   });

  //   expect(res.statusCode).toEqual(404);
  //   expect(res.body.success).toBe(false);
  //   expect(res.body.error).toBe('No such email');
  // });

  it('should create a URL for resetting password', async () => {
    const res = await request(app).post('/api/v1/auth/forgotpassword').send({
      email: 'BernieHelloWorld2@email.com',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBe('Reset password email sent');
  });

  mongoose.connection.close();
});
