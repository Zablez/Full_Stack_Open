import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	message: null,
	isError: false
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload;
		},
		removeNotification(state, action) {
			return initialState;
		},
	},
});

export const { setNotification, removeNotification } =
	notificationSlice.actions;

export const setNewNotification = (message, isError = false, time = 5000) => {
	return async (dispatch) => {
		const obj = {
			message,
			isError
		}

		dispatch(setNotification(obj));

		setTimeout(() => {
			dispatch(removeNotification());
		}, time);
	};
};

export default notificationSlice.reducer;
