const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const colors = require('colors');
const morgan = require('morgan');

/**********************/
/* Import routes here */
/**********************/

/********************************/
// Load env variables.
dotenv.config();

const app = express();

// Server details.
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const MODE = process.env.NODE_ENV;

// Morgan logger. Only run Morgan logger during development.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Helment
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// Backend will receive JSON data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS add frontend domain name here.
const corsOptions = {
  origin: ['http://localhost:3000', 'https://deployedApp.com'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/*************************/
/* Mount routes here     */
/*************************/
module.exports = { app, PORT, HOST, MODE };
