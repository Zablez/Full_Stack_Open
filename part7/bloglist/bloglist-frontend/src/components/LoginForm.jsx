import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setUser } from '../reducers/slice/userReducer';
import { setNewNotification } from '../reducers/slice/notificationReducer';
import { useState } from 'react';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);

			dispatch(setUser(user));

			dispatch(setNewNotification('login success'));
		} catch (error) {
			dispatch(setNewNotification('Wrong credentials', true));
		}
	};

	return (
		<>
			<h2>Login in to application</h2>
			<form id='login-form' onSubmit={handleLogin}>
				<label>username</label>
				<input
					type='text'
					value={username}
					name='username'
					id='username'
					onChange={({ target }) => setUsername(target.value)}
				/>
				<br />

				<label>password</label>
				<input
					type='password'
					value={password}
					name='password'
					id='password'
					onChange={({ target }) => setPassword(target.value)}
				/>
				<br />

				<button id='login-btn' type='submit'>
					login
				</button>
			</form>
		</>
	);
}

export default LoginForm
