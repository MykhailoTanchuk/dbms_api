const Router = require('express').Router;
const {healthcheckController} = require('../controllers/healthcheck.controllers');

const router = Router();

router.route('/').get(healthcheckController);

module.exports = router;
