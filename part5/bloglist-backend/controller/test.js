const Blog = require('../models/blogs');
const User = require('../models/users');

const restController = async (request, response) => {
  await Blog.deleteMany();
  await User.deleteMany();
  response.status(204).end();
};

module.exports = { restController };
