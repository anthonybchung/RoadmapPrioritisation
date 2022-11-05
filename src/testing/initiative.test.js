const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// establish a connecion to the db
const {databaseConnector, databaseDisconnector} = require('../config/db');
const { expect } = require('helmet');
const { response } = require('express');


// set up before-tests and adter-test operations
beforeEach(async () => {
    await databaseConnector();
});

afterEach(async () => {
    await databaseDisconnector();
});

// Tests
describe('Initiative dashboard page....', () => {
    const respond = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
    expect(respond.text).toEqual(expect.stringContaining("Initiative"));
}) 


