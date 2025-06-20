import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    username: '',
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.loading = false;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.username = '';
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;