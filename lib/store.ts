import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

// Example slice (replace with your actual slices)
import counterReducer from './reducers';

// Combine your reducers
const rootReducer = combineReducers({
  counter: counterReducer, // Add more reducers here
});

// Persist configuration
const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Storage mechanism
  whitelist: ['counter'], // Reducers to persist (whitelist)
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
//   middleware: [thunk], // Add thunk middleware (or others if needed)
});

// Create the persisted store
export const persistor = persistStore(store);
