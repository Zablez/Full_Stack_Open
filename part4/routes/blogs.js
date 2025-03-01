const blogsRouter = require('express').Router();
const blogController = require('../controller/blogs');

const middleware = require('../utils/middleware');

blogsRouter.get('/', blogController.getBlog);

blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogController.postBlog
);

blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogController.deleteBlog
);

blogsRouter.put('/:id', blogController.updateBlog);

module.exports = blogsRouter;
