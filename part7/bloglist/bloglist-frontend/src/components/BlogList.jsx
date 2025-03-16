import { useSelector } from "react-redux";

import Blog from "./Blog";
import { ListGroup, ListGroupItem } from 'reactstrap'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	return (
		<>
			<div className="mt-2">
				<ListGroup flush>
					{blogs.length !== 0 && blogs.map((blog) => (
						<Blog
							user={user}
							key={blog.id}
							blog={blog}
						/>
					))}
				</ListGroup>
			</div>
		</>
	)
}

export default BlogList;