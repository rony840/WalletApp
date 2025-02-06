import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';  // Import the logger
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import { userSaga } from './sagas/userSaga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  whitelist: ['user'], // Only persist the `user` slice
  blacklist: [] // Optionally, you can blacklist some slices to not persist
};

// Apply the persistReducer to your userReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configuring the store with logger middleware
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      ignoredActions: ['persist/PERSIST'], // Ignore the persist action
      }}).concat(logger,sagaMiddleware,)
});

sagaMiddleware.run(userSaga);

// Creating a persistor instance
export const persistor = persistStore(store);