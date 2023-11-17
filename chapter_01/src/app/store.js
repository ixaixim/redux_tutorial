import { configureStore } from "@reduxjs/toolkit";  
import counterReducer from "../features/counter/counterSlice";

// reducers in the store are made available to the app through the Provider component
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});