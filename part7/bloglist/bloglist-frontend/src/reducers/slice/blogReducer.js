import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs'

const initialState = [];

const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		addBlog(state, action) {
			return [...state, action.payload];
		},
		setBlogs(state, action) {
			return action.payload;
		},
	},
});

export const { addBlog, setBlogs } = blogSlice.actions;

export const fetchBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		const sortedBlog = blogs.sort((a, b) => b.likes - a.likes);

		dispatch(setBlogs(sortedBlog));
	};
};

export default blogSlice.reducer;
