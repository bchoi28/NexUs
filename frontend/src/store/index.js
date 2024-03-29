import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errors';
import userReducer from './user';
import postsReducer from './post';
import uiReducer from './ui';
import modalReducer from './modal';
import connectionsReducer from './connection';
import clickReducer from './click';

const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer,
    posts: postsReducer,
    errors: errorsReducer,
    ui: uiReducer,
    modal: modalReducer,
    connections: connectionsReducer,
    click: clickReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;