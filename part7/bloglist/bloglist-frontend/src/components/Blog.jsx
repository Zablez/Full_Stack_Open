import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroupItem } from 'reactstrap'

const Blog = ({ user, blog, handleLike, deleteBlog }) => {
	const [isShown, setIsShown] = useState(false)
	const blogStyle = {
		// paddingTop: 10,
		// paddingLeft: 2,
		// border: 'solid',
		// borderWidth: 1,
		// marginBottom: 5,
		color: '#333 !important'
	}

	const addLike = () => {
		handleLike(blog)
	}

	const deleteBlogById = () => {
		deleteBlog(blog)
	}

	return (
		<ListGroupItem className='blog text-grey px-2'>
			<Link to={`blogs/${blog.id}`} style={blogStyle}  className='d-block h-100 w-100'>{blog.title}</Link>
		</ListGroupItem>
	);
}

export default Blog
