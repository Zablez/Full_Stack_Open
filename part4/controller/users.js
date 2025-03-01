const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const getUsers = async (request, response) => {
  const result = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  response.status(200).json(result);
};

const postUser = async (request, response) => {
  const { username, password, name } = request.body;

  if (!username || !password || !name) {
    response
      .status(400)
      .json({ error: 'username, name & password is required' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, password: passwordHash });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
};

module.exports = {
  getUsers,
  postUser,
};
