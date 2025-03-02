const testRouter = require('express').Router();
const restController = require('../controller/test');

testRouter.post('/reset', restController.restController);

module.exports = testRouter;
