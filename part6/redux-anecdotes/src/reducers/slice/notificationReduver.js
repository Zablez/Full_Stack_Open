import { createSlice } from "@reduxjs/toolkit";

const initialState = 's'

const notificationSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setFNotification, removeNotification } = notificationSlice.actions;

export const setNewNotification = (message, time) => {
    return async dispatch => {
        dispatch(setFNotification(message))
        setTimeout(() => { dispatch(removeNotification()) }, time)
    }
}

export default notificationSlice.reducer;