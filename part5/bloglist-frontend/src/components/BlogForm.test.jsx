import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import BlogForm from './BlogForm'

test('New blog is created whne submitting form', async () => {
	const handleCreateBlog = vi.fn();

	render(<BlogForm handleCreateBlog={handleCreateBlog} />)

	const title = screen.getByPlaceholderText('title')
	const author = screen.getByPlaceholderText('author')
	const url = screen.getByPlaceholderText('url')

	userEvent.type(title, "Second Blog")
	userEvent.type(author, "Second one")
	userEvent.type(url, "www.google.com")

	const submitBtn = screen.getByText('Create');

	await userEvent.click(submitBtn);

	expect(handleCreateBlog.mock.calls).toHaveLength(1)
})