const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');

describe('POST /api/v1/auth/forgotpassword', () => {
  it('should return No such email', async () => {
    const res = await request(app).post('/api/v1/auth/forgotpassword').send({
      email: 'fakeNoOne@fake.com',
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('No such email');
  });

  mongoose.connection.close();
});
