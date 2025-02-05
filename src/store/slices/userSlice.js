import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {username: "", firstName: "", lastName: "" },
    isAuthenticated: false,
    isDelete: false,
    updated: false,
    signup: false,
    loading: false,  // Add a loading state to handle async operations
    error: null,     // Optional: Add an error state for error handling
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signupUserAction: (state, action) => {
            state.user = action.payload;
            state.signup = true;
        },
        loginUserAction: (state, action) => {
            state.user = action.payload;
        },
        updateUserAction: (state, action) => {
            state.user = action.payload;
            state.updated = true;
        },
        logoutUserAction: (state) => {
            state.user = {username: "", firstName: "", lastName: "" },
            state.isAuthenticated = false;
        },
        deleteUserAction: (state) => {
            state.user = {username: "", firstName: "", lastName: "" },
            state.isAuthenticated = false;
        },
        fetchUserAction: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            state.isAuthenticated = true;
        },
        startLoading: (state) => {
            state.loading = true; // Set loading to true when starting async operations
        },
        stopLoading: (state) => {
            state.loading = false; // Set loading to false when done
        },
        setError: (state, action) => {
            state.error = action.payload; // Store error messages
        },
    }
});

export const { 
    signupUserAction, 
    loginUserAction, 
    updateUserAction, 
    logoutUserAction, 
    deleteUserAction, 
    fetchUserAction, 
    startLoading, 
    stopLoading, 
    setError 
} = userSlice.actions;

export default userSlice.reducer;
