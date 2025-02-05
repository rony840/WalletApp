// userSaga.js
import { takeLatest, call, put } from 'redux-saga/effects';
import { startLoading, stopLoading, setError, 
         signupUserAction, loginUserAction, updateUserAction, logoutUserAction,
         fetchUserAction, deleteUserAction } from '../slices/userSlice';
import { 
  signUpUser, 
  authenticateUser, 
  fetchUserData, 
  updateUserProfile, 
  deleteUserAccount, 
  logoutUser 
} from '../../services/UserAPI'; // Import your API functions


function* signupUserSaga(action) {
    try {
      yield put(startLoading()); // Start loading before API call
  
      // Make the API call to sign up the user
      const response = yield call(signUpUser, action.payload); // action.payload contains the user data
    console.log('signup response',response);
      // Check the response from the server
      if (response && response.message === 'User added successfully!') {
        // If successful, dispatch signup action with the user data
        yield put(setError(null)); // Clear any previous errors
  
        // Optionally show a success alert or navigate to another screen
        // Example: You can dispatch a navigation action here if needed
      } else {
        yield put(setError(response.message || 'Something went wrong'));
      }
  
      yield put(stopLoading()); // Stop loading after the API call finishes
    } catch (error) {
      yield put(setError('An error occurred during signup. Please try again.'));
      yield put(stopLoading()); // Stop loading if an error occurs
    }
  }

function* loginUserSaga(action) {
    try {
      yield put(startLoading()); // Start loading
      console.log('user in login saga: ',action.payload.username)
      console.log('pass in login saga: ',action.payload.password)
      // Call API for authentication
      const response = yield call(authenticateUser, action.payload.username, action.payload.password);
      console.log('response in saga',response)
      console.log('response in saga',response.message)
      // If successful login
      if (response.message == "Authentication successful") {
        yield put(fetchUserAction({
          isAuthenticated: true,
          firstName: response.user.firstname,
          lastName: response.user.lastname,
          username: response.user.username,
        }));
        yield put(setError(null)); // Clear any previous errors
      } else {
        yield put(setError('Invalid username or password'));
      }
      
      yield put(stopLoading()); // Stop loading
    } catch (error) {
        console.log(error)
      yield put(setError('An error occurred during login. Please try again.'));
      yield put(stopLoading());
    }
  }
  

function* fetchUserSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(fetchUserData, action.payload.username);
    console.log('fetch response in saga:',response);
    yield put(fetchUserAction(response.data));  // Dispatch fetch action
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error.message));
    yield put(stopLoading());
  }
}

function* updateUserSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(updateUserProfile, action.payload.username, action.payload.updatedData);
    console.log('response for update user insaga',response)
    yield put(fetchUserAction({
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        username: response.data.username,
    }));  // Dispatch update action
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error.message));
    yield put(stopLoading());
  }
}

function* deleteUserSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(deleteUserAccount, action.payload.username);
    yield put(deleteUserAction(response));  // Dispatch delete action
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error.message));
    yield put(stopLoading());
  }
}

function* logoutUserSaga() {
  try {
    yield put(startLoading());
    const response = yield call(logoutUser);
    yield put(logoutUserAction(response)); // Dispatch logout action
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error.message));
    yield put(stopLoading());
  }
}

// Watcher saga
export function* userSaga() {
  yield takeLatest('user/signupUserAction', signupUserSaga);
  yield takeLatest('user/loginUserAction', loginUserSaga);
  yield takeLatest('user/fetchUserAction', fetchUserSaga);
  yield takeLatest('user/updateUserAction', updateUserSaga);
  yield takeLatest('user/deleteUserAction', deleteUserSaga);
  yield takeLatest('user/logoutUserAction', logoutUserSaga);
}
