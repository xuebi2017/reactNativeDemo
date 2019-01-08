import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import reducers from "../reducer/index";
const logger = createLogger();

const enhancer = composeWithDevTools({

})(applyMiddleware(thunk, promise, logger));
  

export default function configureStore(preloadedState) {
    const store = createStore(
        reducers,
        preloadedState,
        enhancer,
        //applyMiddleware(thunk, promise, logger)
    );
    return store;
}