import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './slice/anecdoteReducer';
import filterReducer from './slice/filterReducer';
import notificationReducer from './slice/notificationReduver';

const store = configureStore({
    reducer: {
        quotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer,
    }
})

export default store;