const Router = require('express').Router;
const healthcheckRoutes = require('./healthcheck.routes');

const router = Router();

router.use('/', healthcheckRoutes);

module.exports = router;
