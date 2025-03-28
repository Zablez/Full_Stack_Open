const express = require('express');
const cors = require('cors');
const User = require('./models/users')
const Blog = require('./models/blogs')
require('express-async-errors');
const mongoose = require('mongoose');

const config = require('./utils/config');

const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const middleware = require('./utils/middleware');
const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);


if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controller/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler);

module.exports = app;
