import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// Redux Persist init config
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

// Create persistedReducer, this allows us to rehydrate the reducers from local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add middleware (basically enhancers to the redux store) to this array
const middleWares = [logger];

// Apply middlewares from left to right, where each item in the array is passed as an
// argument to applyMiddleware, the output of which is passed to compose, allowing them
// to be executed BEFORE the reducers are executed.
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);