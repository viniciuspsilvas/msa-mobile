import React from 'react';
import { Root } from 'native-base';
import AppNavigation from './AppNavigation'

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./rootReducer";

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk, logger)
));

export default class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Root>
                <AppNavigation />
            </Root>
        </Provider>;

    }
}