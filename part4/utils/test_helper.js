const Blog = require('../models/blogs');
const User = require('../models/users');

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'First Author',
    url: 'https://first.com',
    likes: 0,
  },
  {
    title: 'Second Blog',
    author: 'Second Author',
    url: 'https://second.com',
    likes: 0,
  },
];

const blogsinDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initialUsers = [
  {
    name: 'lija',
    username: 'lija',
    password: 'lija123',
  },
  {
    name: 'lija2',
    username: 'lija2',
    password: 'lija456',
  },
];

const usersinDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsinDB,
  initialUsers,
  usersinDB,
};
