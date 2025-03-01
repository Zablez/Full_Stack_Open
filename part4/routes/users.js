const usersRouter = require('express').Router();
const userController = require('../controller/users');

usersRouter.get('/', userController.getUsers);
usersRouter.post('/', userController.postUser);

module.exports = usersRouter;
