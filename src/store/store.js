import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';  // Import the logger
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import { userSaga } from './sagas/userSaga';

//creating instance of sagamiddleware
const sagaMiddleware = createSagaMiddleware();

// Creating the logger middleware instance
const logger = createLogger({
  collapsed: true, //set it to false to expand logs
  diff: true, //shows difference in prev and next state
});

// Configuring the store with logger middleware
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger,sagaMiddleware)
});

sagaMiddleware.run(userSaga);