import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

// Redux Persist init config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']  // just persist this store slice
};

const sagaMiddleware = createSagaMiddleware();

// Create persistedReducer, this allows us to rehydrate the reducers from local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add middleware (basically enhancers to the redux store) to this array
// Note: by passing "Boolean" to filter we are removing falsey array values,
// which can occur in this case if the node environment is set to
// "production" (which would also prevent the logger middleware from loading).
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Apply middlewares from left to right, where each item in the array is passed as an
// argument to applyMiddleware, the output of which is passed to compose, allowing them
// to be executed BEFORE the reducers are executed.
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);