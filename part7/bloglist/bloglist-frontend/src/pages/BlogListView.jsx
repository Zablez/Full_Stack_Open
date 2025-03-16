import { useRef } from "react";

import BlogForm from "../components/BlogForm"
import BlogList from "../components/BlogList"
import Togglable from "../components/Toggle"

const BlogListView = () => {
	const blogFormRef = useRef();

	return (
		<>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<BlogForm ref={blogFormRef} />
			</Togglable>
			<BlogList />
		</>
	)
}

export default BlogListView
