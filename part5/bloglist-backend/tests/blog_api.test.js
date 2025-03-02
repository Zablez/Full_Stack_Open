const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const bcrypt = require('bcryptjs');

const Blog = require('../models/blogs');
const app = require('../app');
const helper = require('../utils/test_helper');
const User = require('../models/users');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('lijja123', 10);
  const user = new User({
    username: 'lijja',
    name: 'lijja',
    password: passwordHash,
  });

  const savedUser = await user.save();

  let blogObj = new Blog({ ...helper.initialBlogs[0], user: savedUser.id });
  await blogObj.save();
  blogObj = new Blog({ ...helper.initialBlogs[1], user: savedUser.id });
  await blogObj.save();
});

const getToken = async (user) => {
  const loginUser = await api.post('/api/login').send(user);
  return await loginUser.body.token;
};

describe('Retriving Blog', () => {
  test('It return two blogs', async () => {
    const result = await api.get('/api/blogs');

    assert.strictEqual(result.body.length, 2);
  });

  test('It checks if the obj contains id', async () => {
    const result = await api.get('/api/blogs');

    const obj = result.body[0];

    assert.strictEqual('id' in obj, true);
  });
});

const userObj = {
  username: 'lijja',
  password: 'lijja123',
};

describe('Adding Blogging', () => {
  test('When token is not provided, it returns 401', async () => {
    const blogObj = {
      title: 'Third Blog',
      author: 'Third Author',
      url: 'https://third.com',
      likes: 0,
    };

    const blogAtStart = await helper.blogsinDB();

    await api
      .post('/api/blogs')
      .send(blogObj)
      .expect(401)

    const blogAtEnd = await helper.blogsinDB();

    assert.strictEqual(blogAtStart.length, blogAtEnd.length);
  });

  test('It checks if blogs is added sucessfully', async () => {
    const blogObj = {
      title: 'Third Blog',
      author: 'Third Author',
      url: 'https://third.com',
      likes: 0,
    };

    const token = await getToken(userObj);

    await api
      .post('/api/blogs')
      .send(blogObj)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const result = await api.get('/api/blogs');
    const content = result.body.map((b) => b.title);
    assert.strictEqual(result.body.length, helper.initialBlogs.length + 1);
    assert(content.includes('Third Blog'));
  });

  test('If likes property is missing, it will be added', async () => {
    const blogObj = {
      title: 'Third Blog',
      author: 'Third Author',
      url: 'https://third.com',
    };

    const token = await getToken(userObj);

    await api
      .post('/api/blogs')
      .send(blogObj)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const results = await helper.blogsinDB();
    const content = results.map((b) => b.title);

    assert(content.includes('Third Blog'));

    const blog = results.find((blog) => blog.title == 'Third Blog');

    assert.strictEqual(blog.likes, 0);
  });

  test('If title or url properties are missing, it return 400 bad request', async () => {
    const blogObj = {
      author: 'Third Author',
    };

    const token = await getToken(userObj);

    await api
      .post('/api/blogs')
      .send(blogObj)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    const results = await helper.blogsinDB();

    assert.strictEqual(helper.initialBlogs.length, results.length);
  });

  test('If title or url properties are missing, it return 400 bad request', async () => {
    const blogObj = {
      author: 'Third Author',
    };

    const token = await getToken(userObj);

    await api
      .post('/api/blogs')
      .send(blogObj)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    const results = await helper.blogsinDB();

    assert.strictEqual(helper.initialBlogs.length, results.length);
  });
});

describe('Delete blog information', () => {
  test('if invalid id given, return 400', async () => {
    const invalidId = '4412545sd545454';

    const blogsAtStart = await helper.blogsinDB();

    const token = await getToken(userObj);
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
      .set('Authorization', `Bearer ${token}`);

    const blogsAtEnd = await helper.blogsinDB();

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
  });

  test('if valid id given, return 204', async () => {
    const blogsAtStart = await helper.blogsinDB();
    const blogToDelete = blogsAtStart[0];

    const token = await getToken(userObj);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsinDB();

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length + 1);
  });
});

describe('Update blog', () => {
  test('if invalid id given, return 400', async () => {
    const invalidId = '67af16a1e47f90c645dc478q';

    const blogsAtStart = await helper.blogsinDB();

    const token = await getToken(userObj);
    await api
      .put(`/api/blogs/${invalidId}`)
      .expect(400)
      .set('Authorization', `Bearer ${token}`);

    const blogsAtEnd = await helper.blogsinDB();

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
  });

  test('if valid id given but does not exist, return 404', async () => {
    const blogsAtStart = await helper.blogsinDB();

    const validId = '67af1849de514987e5591f8a';

    const blogObj = {
      title: 'Third Blog',
      author: 'Third Author',
      url: 'https://third.com',
      likes: 4,
    };

    const token = await getToken(userObj);
    await api
      .put(`/api/blogs/${validId}`)
      .send(blogObj)
      .expect(404)
      .set('Authorization', `Bearer ${token}`);

    const blogsAtEnd = await helper.blogsinDB();

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
  });

  test('if valid, return 200', async () => {
    const blogsAtStart = await helper.blogsinDB();
    const blogToDelete = blogsAtStart[0];

    const blogObj = {
      title: 'Third Blog',
      author: 'Third Author',
      url: 'https://third.com',
      likes: 4,
    };

    const token = await getToken(userObj);
    await api
      .put(`/api/blogs/${blogToDelete.id}`)
      .send(blogObj)
      .expect(204)
      .set('Authorization', `Bearer ${token}`);

    const blogsAtEnd = await helper.blogsinDB();

    const contents = blogsAtEnd.find((b) => b.title === 'Third Blog');

    assert.strictEqual(contents.likes, blogObj.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
