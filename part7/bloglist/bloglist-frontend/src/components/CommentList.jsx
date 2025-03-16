import { useState } from "react";
import BlogService from '../services/blogs'
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/slice/blogReducer";
import { setNewNotification } from "../reducers/slice/notificationReducer";
import { Button, Form, FormGroup, Input, Label, ListGroup, ListGroupItem } from 'reactstrap'

const CommentList = ({ blog }) => {
	const { comments } = blog;
	const [comment, setComment] = useState(null)

	const dispatch = useDispatch();

	const handleAddComment = async () => {
		try {
			if (!comment) {
				throw new Error()
			}

			await BlogService.addCommentById(blog, comment);

			dispatch(setNewNotification('comment added'));
			dispatch(fetchBlogs())
		} catch {
			dispatch(setNewNotification('Failed to add comment', true));
		}
	}

	return (
		<div className="mt-5">
			<h5 className="fw-bold">Comments</h5>

			<Form onSubmit={handleAddComment}>
				<FormGroup>
					<Input
						onChange={({ target }) => setComment(target.value)}
					/>
				</FormGroup>
				<Button>add comment</Button>
			</Form>

			<ListGroup className="mt-2">
				{comments.length > 0 && comments.map((c, index) => (
					<ListGroupItem key={`${c + index}`}>{c}</ListGroupItem>
				))}
			</ListGroup>
		</div>
	)
}

export default CommentList;