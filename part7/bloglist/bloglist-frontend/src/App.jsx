import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import blogService from './services/blogs.js';

import UserList from './pages/UserList.jsx';
import UserDetails from './pages/UserDetails.jsx';
import BlogListView from './pages/BlogListView.jsx';

import Togglable from './components/Toggle.jsx';
import LoginForm from './components/LoginForm.jsx';
import Notification from './components/Notification.jsx';

import { fetchBlogs } from './reducers/slice/blogReducer.js';
import { removeUser, setUser } from './reducers/slice/userReducer.js';
import BlogDetails from './pages/BlogDetails.jsx';
import Menu from './components/Navbar.jsx';

const App = () => {
	const user = useSelector(state => state.user)

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

	useEffect(() => {
		const loggerUserJson = window.localStorage.getItem('loggedUser');

		if (loggerUserJson) {
			const user = JSON.parse(loggerUserJson);

			dispatch(setUser(user));

			blogService.setToken(user.token);
		}
	}, []);

	return (
		<Router>
			<div className="container">
				<Notification />
				{!user && (
					<Togglable buttonLabel="login">
						<LoginForm />
					</Togglable>
				)}

				{user && (
					<>
						<Menu />

						<Routes>
							<Route path="/" element={<BlogListView />} />
							<Route path="/users" element={<UserList />} />
							<Route path="/users/:id" element={<UserDetails />} />
							<Route path="/blogs/:id" element={<BlogDetails />} />
						</Routes>
					</>
				)}
			</div>
		</Router>
	);
};

export default App;
