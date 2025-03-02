const loginRouter = require('express').Router();
const loginController = require('../controller/login');

loginRouter.post('/', loginController.login);

module.exports = loginRouter;
