import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// Add middleware (basically enhancers to the redux store) to this array
const middleWares = [logger];

// Apply middlewares from left to right, where each item in the array is passed as an
// argument to applyMiddleware, the output of which is passed to compose, allowing them
// to be executed BEFORE the reducers are executed.
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);