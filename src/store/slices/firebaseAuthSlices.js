import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {email: "", password: ""},
    authUser: {_user: {}},
    isAuthenticated: false,
    signedup: false,
    loggedin: false,
    loading: false,  // Add a loading state to handle async operations
    error: null,     // Optional: Add an error state for error handling
};

const firebaseAuthSlice = createSlice({
    name: 'firebaseAuth',
    initialState,
    reducers: {
        signupFirebase: (state, action) => {
            state.user = action.payload;
        },
        signupFirebaseFailed: (state, action) => {
            state.authUser = action.payload;
            state.signedup = false;
        },
        signupFirebaseSuccess: (state, action) => {
            state.authUser = action.payload;
            state.signedup = true;
            state.isAuthenticated= true;
        },
        loginFirebase: (state, action) => {
            state.user = action.payload;
        },
        loginFirebaseFailed: (state, action) => {
            state.authUser = action.payload;
            state.loggedin = false;
        },
        loginFirebaseSuccess: (state, action) => {
            state.authUser = action.payload;
            state.loggedin = true;
            state.isAuthenticated= true;
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
    signupFirebase,
    signupFirebaseFailed,
    signupFirebaseSuccess,
    loginFirebase,
    loginFirebaseFailed,
    loginFirebaseSuccess,
    startLoading, 
    stopLoading, 
    setError 
} = firebaseAuthSlice.actions;

export default firebaseAuthSlice.reducer;
