import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', name: 'Neil Armstrong' },
    { id: '2', name: 'Buzz Aldrin' },
    { id: '3', name: 'Sally Ride' }
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;