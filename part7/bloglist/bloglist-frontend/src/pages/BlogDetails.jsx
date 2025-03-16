import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import blogService from '../services/blogs';
import { setNewNotification } from "../reducers/slice/notificationReducer";
import { fetchBlogs } from "../reducers/slice/blogReducer";
import { useEffect } from "react";
import CommentList from "../components/CommentList";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'

const BlogDetails = () => {
	const blogs = useSelector(state => state.blogs)
	const id = useParams().id
	const blog = blogs.find(n => n.id === id)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [])

	const handleLike = async () => {
		try {
			await blogService.likeBlog(blog);

			dispatch(setNewNotification('Blog liked'));
			dispatch(fetchBlogs());
		} catch (error) {
			dispatch(setNewNotification('Failed to like blog', true));
		}
	};

	const deleteBlog = async () => {
		try {
			const toDelete = confirm(`Remove ${blog.title} by ${blog.author}`);

			if (!toDelete) return;

			await blogService.deleteBlog(blog.id);

			dispatch(setNewNotification('Blog deleted'));

			dispatch(fetchBlogs());
		} catch (error) {
			dispatch(setNewNotification(error.response.data.error, true));
		}
	};

	return (
		<>
			{blog && <>
				<Card
				>
					<CardBody>
						<CardTitle tag="h5">
							{blog.title}
						</CardTitle>
						<a href={blog.url}>{blog.url}</a>

						<CardText className="d-flex align-items-center gap-4">
							likes {blog.likes}
							<Button outline id='like-btn' onClick={handleLike}>
								like
							</Button>
						</CardText>

						<CardText>added by {blog.author}</CardText>

					</CardBody>
				</Card>

				<CommentList blog={blog} />
			</>
			}
		</>
	)
}

export default BlogDetails;