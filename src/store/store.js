import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';  // Import the logger
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import { userSaga } from './sagas/userSaga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseAuthReducer from "./slices/firebaseAuthSlices";
import { firebaseAuthSaga } from './sagas/firebaseSaga';
//creating instance of sagamiddleware
const sagaMiddleware = createSagaMiddleware();

// Creating the logger middleware instance
const logger = createLogger({
  collapsed: true, //set it to false to expand logs
  diff: true, //shows difference in prev and next state
});

// Redux Persist Configuration
const persistConfig = {
  key: 'root', // Key to identify the persisted state
  storage: AsyncStorage, // You can change this to sessionStorage or AsyncStorage for React Native
  whitelist: ['user','firebaseAuth'], // persist firebase and user
  blacklist: [] // Optionally, you can blacklist some slices to not persist
};

// Apply the persistReducer to your userReducer
const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedFirebase = persistReducer(persistConfig, firebaseAuthReducer);

// Configuring the store with logger middleware
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    firebaseAuth: persistedFirebase,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      ignoredActions: ['persist/PERSIST'], // Ignore the persist action
      }}).concat(logger,sagaMiddleware)
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(firebaseAuthSaga);

// Creating a persistor instance
export const persistor = persistStore(store);