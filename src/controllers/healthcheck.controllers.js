const { getHealthcheckMsg } = require('../services/healthcheck.services');

const healthcheckController = (_, res) => {
  const response = getHealthcheckMsg();

  res.send(response);
};

module.exports = {
  healthcheckController,
}
