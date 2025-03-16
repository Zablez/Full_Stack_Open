const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');

const User = require('../models/users');
const app = require('../app');
const helper = require('../utils/test_helper');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  let userObj = new User(helper.initialUsers[0]);
  await userObj.save();
  userObj = new User(helper.initialUsers[1]);
  await userObj.save();
});

describe('With initial user data', () => {
  test('It return users with status 200', async () => {
    const usersAtStart = await helper.usersinDB();
    const result = await api.get('/api/users').expect(200);

    assert.strictEqual(result.body.length, usersAtStart.length);
  });
});

describe('Adding users', () => {
  test('When not provided name or username or password, It return status 400', async () => {
    const usersAtStart = await helper.usersinDB();

    const userObj = {};

    await api.post('/api/users').send(userObj).expect(400);

    const usersAtEnd = await helper.usersinDB();

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test('When provided name or username or password, It return status 201', async () => {
    const usersAtStart = await helper.usersinDB();

    const userObj = {
      name: 'listbista',
      username: 'listbista',
      password: 'listbista123',
    };

    await api.post('/api/users').send(userObj).expect(201);

    const usersAtEnd = await helper.usersinDB();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
