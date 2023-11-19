import { configureStore } from "@reduxjs/toolkit";  
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';


// reducers in the store are made available to the app through the Provider component
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
});