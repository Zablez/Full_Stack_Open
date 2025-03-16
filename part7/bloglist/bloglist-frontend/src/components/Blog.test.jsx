import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('Display blog\'s title and author, but does not render URL or number of likes by default', () => {
	const blog = {
		title: 'First Blog',
		author: 'First one',
		url: 'www.gogle.com',
		likes: '3'
	}

	render(<Blog blog={blog} />)

	const title = screen.queryByText('First Blog')
	const author = screen.queryByText('First one')
	const url = screen.queryByText('www.gogle.com')
	const likes = screen.queryByText('3')

	expect(title).toBeDefined()
	expect(author).toBeDefined()
	expect(url).toBeNull()
	expect(likes).toBeNull()
})

test('Display URL and number of likes when the view button is clicked', async () => {
	const blog = {
		title: 'First Blog',
		author: 'First one',
		url: 'www.gogle.com',
		likes: '3'
	}

	render(<Blog blog={blog} />)

	const viewBtn = screen.getByText('view')
	await userEvent.click(viewBtn)

	const url = screen.queryByText('www.gogle.com')
	const likes = screen.queryByText('3')

	expect(url).toBeDefined();
	expect(likes).toBeDefined();
})


test('Like button is clicked twice', async () => {
	const handleLike = vi.fn();

	const blog = {
		title: 'First Blog',
		author: 'First one',
		url: 'www.gogle.com',
		likes: '3'
	}

	render(<Blog blog={blog} handleLike={handleLike} />)

	const view_blog = screen.getByText('view')
	await userEvent.click(view_blog)

	expect('likes 3').toBeDefined()
	const like_btn = screen.getByText('like');
	await userEvent.click(like_btn)
	await userEvent.click(like_btn)
	expect('likes 5').toBeDefined()
})
