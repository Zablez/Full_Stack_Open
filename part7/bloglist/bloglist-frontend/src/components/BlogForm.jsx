import { forwardRef, useRef, useState } from 'react'
import blogService from '../services/blogs'
import { fetchBlogs } from '../reducers/slice/blogReducer'
import { useDispatch } from 'react-redux'
import { setNewNotification } from '../reducers/slice/notificationReducer'

import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const BlogForm = forwardRef((props, refs) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const dispatch = useDispatch();

	const handleCreateBlog = async (event) => {
		event.preventDefault()
		try {
			const blogObj = { title, author, url }

			const response = await blogService.createBlog(blogObj);
			dispatch(fetchBlogs());

			const message = `A new blog ${response.title} by ${response.author} added`

			dispatch(setNewNotification(message));

			refs.current.toggleVisibility();

			setTitle('')
			setAuthor('')
			setUrl('')
		} catch (error) {
			dispatch(setNewNotification('Failed to create blog', true));
		}
	};

	return (
		<div className='mb-2'>
			<h3 className='fw-bold'>Create new</h3>

			<Form onSubmit={handleCreateBlog}>
				<FormGroup>
					<Label for="title">
						Title
					</Label>
					<Input
						type='text'
						value={title}
						name='title'
						id='title'
						placeholder='title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label for="author">Author</Label>
					<Input
						type='text'
						value={author}
						name='author'
						id='author'
						placeholder='author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label for="url">Url</Label>
					<Input
						type='text'
						value={url}
						name='url'
						id='url'
						placeholder='url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</FormGroup>

				<Button>Submit</Button>
			</Form>
		</div>
	);
})

export default BlogForm
