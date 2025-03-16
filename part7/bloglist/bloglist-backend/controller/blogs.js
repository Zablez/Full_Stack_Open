const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Blog = require('../models/blogs');
const User = require('../models/users');

const getBlog = async (request, response) => {
	const result = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.status(200).json(result);
};

const postBlog = async (request, response) => {
	const { title, author, url, likes } = request.body;
	const { id } = request.user;

	if (!id) {
		response.status(401).json({ error: 'Unauthorized' });
	}

	if (!title || !url) {
		response.status(400).json({ error: 'title or url is missing' });
		return;
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' });
	}

	const user = await User.findById(id);

	const blog = new Blog({
		title,
		author,
		url,
		likes: likes ? likes : 0,
		user: user.id,
	});

	const result = await blog.save();

	user.blogs = user.blogs.concat(result.id);

	await user.save();

	response.status(201).json(result);
};

const deleteBlog = async (request, response) => {
	const { id } = request.params;
	const user = request.user;

	if (!user) {
		response.status(401).json({ error: 'Unauthorized' });
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		response.status(400).json({ error: 'Id is invalid' });
		return;
	}

	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const blog = await Blog.findById(id);

	if (blog.user.toString() === user.id) {
		await Blog.findByIdAndDelete(id);
		response.status(204).end();
	} else {
		return response
			.status(401)
			.json({ error: 'Unauthorized to delete the blog' });
	}
};

const updateBlog = async (request, response) => {
	const { id } = request.params;
	const { title, author, url, likes, comments } = request.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		response.status(400).json({ error: 'Id is invalid' });
		return;
	}

	const exits = await Blog.findById(id);

	if (!exits) {
		response.status(404).json({ error: 'Not found' });
		return;
	}

	const blog = {
		title: title ? title : exits.title,
		author: author ? author : exits.author,
		url: url ? url : exits.url,
		likes: likes ? likes : exits.likes,
		comments: comments ? comments : exits.comments,
	};

	await Blog.findByIdAndUpdate(id, blog, { new: true });

	response.status(204).end();
};

module.exports = {
	getBlog,
	postBlog,
	deleteBlog,
	updateBlog,
};
