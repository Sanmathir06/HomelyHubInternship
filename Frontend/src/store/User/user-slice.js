import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
        success: false,
    },

    reducers: {
        // Signup
        getSignupRequest(state) {
            state.loading = true;
        },

        getSignupDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        // Login
        getLoginRequest(state) {
            state.loading = true;
        },

        getLoginDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        // Current User
        getCurrentRequest(state) {
            state.loading = true;
        },

        getCurrentUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        // Logout
        getLogout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },

        // Update User
        getUpdateUserRequest(state) {
            state.loading = true;
        },

        // Password
        getPasswordRequest(state) {
            state.loading = true;
        },

        getPasswordSuccess(state, action) {
            state.loading = false;
            state.success = action.payload;
        },

        // Error
        getError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        clearErrors(state) {
            state.error = null;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;