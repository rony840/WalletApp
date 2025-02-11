import { call, put, takeLatest } from "redux-saga/effects";
import { 
    startLoading, stopLoading, setError,
    loginFirebaseFailed, loginFirebaseSuccess,
    signupFirebaseFailed, signupFirebaseSuccess 
} from "../slices/firebaseAuthSlices";
import { loginOnFirebase, signUpOnFirebase } from "../../services/FirebaseAuth";

function* loginFirebaseSaga(action) {
    try {
        yield put(startLoading()); // Start loading
        console.log('User in login saga:', action.payload.email);
        
        // Call Firebase authentication API
        const response = yield call(loginOnFirebase, action.payload.email, action.payload.password);
        
        console.log('Login response:', response);
        
        // Dispatch success action with user data
        yield put(loginFirebaseSuccess(response)); 
        
    } catch (error) {
        console.error('Login error:', error);
        
        // Dispatch failure action
        yield put(loginFirebaseFailed());
        
        // Store error message in Redux state
        yield put(setError(error.message || 'An error occurred during login. Please try again.'));
    } finally {
        yield put(stopLoading()); // Stop loading
    }
}

function* signupFirebaseSaga(action) {
    try {
        yield put(startLoading()); // Start loading
        console.log('User in signup saga:', action.payload.email);
        
        // Call Firebase authentication API
        const response = yield call(signUpOnFirebase, action.payload.email, action.payload.password);
        
        console.log('Signup response:', response);
        
        // Dispatch success action with user data
        yield put(signupFirebaseSuccess(response)); 
        
    } catch (error) {
        console.error('Signup error:', error);
        
        // Dispatch failure action
        yield put(signupFirebaseFailed());
        
        // Store error message in Redux state
        yield put(setError(error.message || 'An error occurred during signup. Please try again.'));
    } finally {
        yield put(stopLoading()); // Stop loading
    }
}

// Watcher saga
export function* firebaseAuthSaga() {
  yield takeLatest('firebaseAuth/loginFirebase', loginFirebaseSaga);
  yield takeLatest('firebaseAuth/signupFirebase', signupFirebaseSaga);
}
