import { useState } from 'react'


const BlogForm = ({ handleCreateBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()

		handleCreateBlog({ title, author, url })

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<>
			<h3>Create new</h3>

			<form onSubmit={addBlog}>
				<label>title</label>
				<input
					type='text'
					value={title}
					name='title'
					id='title'
					placeholder='title'
					onChange={({ target }) => setTitle(target.value)}
				/>
				<br />

				<label>author</label>
				<input
					type='text'
					value={author}
					name='author'
					id='author'
					placeholder='author'
					onChange={({ target }) => setAuthor(target.value)}
				/>
				<br />

				<label>Url</label>
				<input
					type='text'
					value={url}
					name='url'
					id='url'
					placeholder='url'
					onChange={({ target }) => setUrl(target.value)}
				/>
				<br />

				<button id='create-btn' type='submit'>
					Create
				</button>
			</form>
		</>
	);
}

export default BlogForm
