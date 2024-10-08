const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/index');
const { urlencoded, json } = require('express');

const app = express();

dotenv.config();

const port = process.env.PORT || 8080;

app.use(urlencoded({ extended: true }));

app.use(cors());

app.options('*', cors());

app.use(json());

//all routes are prefixed with /v1
app.use('/api/', router);

let server;

app.listen(port, () => {
  console.info(`Listening to port http://localhost:${port}/api/`);
});

//exception handling
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
