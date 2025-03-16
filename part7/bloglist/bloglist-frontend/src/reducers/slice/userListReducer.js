import { createSlice } from '@reduxjs/toolkit';
import userService from '../../services/users'


const initialState = [];

const userSlice = createSlice({
	name: 'userList',
	initialState,
	reducers: {
		setUserList(state, action) {
			return action.payload;
		},
	},
});

export const { setUserList } = userSlice.actions;

export const fetchUserList = () => {
	return async (dispatch) => {
		const users = await userService.getAll();
		
		dispatch(setUserList(users));
	};
};

export default userSlice.reducer;
