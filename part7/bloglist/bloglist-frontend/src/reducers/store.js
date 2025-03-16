import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './slice/notificationReducer';
import blogReducer from './slice/blogReducer';
import userReducer from './slice/userReducer';
import userListReducer from './slice/userListReducer';

const store = configureStore({
	reducer: {
		userList: userListReducer,
		user: userReducer,
		blogs: blogReducer,
		notification: notificationReducer,
	},
});

export default store;
