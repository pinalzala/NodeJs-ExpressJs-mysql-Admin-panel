require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sendEmail = require('_helpers/send-email');
const config = require('config.json');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
const formidable = require('express-formidable');

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// bodyparser middleware
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Middleware
app.use(cookieParser());

// api routes
app.use('/api', require('./accounts/accounts.controller'));

// Application api route

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, '0.0.0.0', () => console.log('Server listening on port ' + port));

















